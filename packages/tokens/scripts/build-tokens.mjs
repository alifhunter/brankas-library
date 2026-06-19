import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputRoots = [path.join(packageRoot, 'source'), path.join(packageRoot, 'src')];
const layerNames = new Set(['primitives', 'semantic', 'components']);
const generatedRoot = path.join(packageRoot, 'src', 'generated');
const distRoot = path.join(packageRoot, 'dist');
const cssVariablePrefix = 'brankas';

const sourceFiles = await findTokenFiles(inputRoots);

if (sourceFiles.length === 0) {
  throw new Error(
    'No token files found. Expected *.tokens.json under packages/tokens/source or packages/tokens/src.',
  );
}

const mergedTokenTree = {};
const tokenRecords = new Map();
const errors = [];

for (const filePath of sourceFiles) {
  const layer = getLayerName(filePath);
  const json = await readJson(filePath);
  mergeObject(mergedTokenTree, json, filePath);
  collectTokens(json, [], undefined, filePath, layer);
}

for (const token of tokenRecords.values()) {
  try {
    token.resolvedValue = resolveTokenValue(token.name, []);
    token.cssValue = toCssValue(token.resolvedValue, token.type);
    token.cssVariables = buildCssVariablesForToken(token);
  } catch (error) {
    errors.push(error.message);
  }
}

if (errors.length > 0) {
  throw new Error(`Token validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
}

const tokens = toNestedTokenObject([...tokenRecords.values()]);
const tokenList = [...tokenRecords.values()]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((token) => ({
    name: token.name,
    path: token.path,
    type: token.type,
    layer: token.layer,
    value: token.value,
    resolvedValue: token.resolvedValue,
    cssValue: token.cssValue,
    cssVariable: token.cssVariable,
    cssVariables: token.cssVariables,
    description: token.description,
  }));
const cssVariables = Object.assign({}, ...tokenList.map((token) => token.cssVariables));

await mkdir(generatedRoot, { recursive: true });
await mkdir(distRoot, { recursive: true });
await writeFile(
  path.join(generatedRoot, 'tokens.ts'),
  await prettier.format(buildTypescriptOutput(tokens, tokenList, cssVariables), {
    parser: 'typescript',
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    printWidth: 100,
  }),
);
await writeFile(
  path.join(distRoot, 'tokens.css'),
  await prettier.format(buildCssOutput(tokenList), {
    parser: 'css',
    singleQuote: true,
    semi: true,
    printWidth: 100,
  }),
);

console.log(`Built ${tokenList.length} tokens from ${sourceFiles.length} source files.`);

async function findTokenFiles(roots) {
  const files = [];

  for (const root of roots) {
    files.push(...(await walk(root)));
  }

  return files
    .filter((filePath) => filePath.endsWith('.tokens.json'))
    .filter((filePath) => !filePath.includes(`${path.sep}generated${path.sep}`))
    .sort();
}

async function walk(directory) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'generated' || entry.name === 'dist' || entry.name === 'node_modules') {
        continue;
      }

      files.push(...(await walk(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

async function readJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to parse ${relative(filePath)}: ${error.message}`);
  }
}

function mergeObject(target, source, filePath) {
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$')) {
      target[key] ??= value;
      continue;
    }

    if (isPlainObject(value) && isPlainObject(target[key])) {
      mergeObject(target[key], value, filePath);
    } else if (target[key] === undefined) {
      target[key] = value;
    } else {
      errors.push(`Duplicate token path "${key}" while merging ${relative(filePath)}.`);
    }
  }
}

function collectTokens(node, pathParts, inheritedType, filePath, layer) {
  if (!isPlainObject(node)) {
    return;
  }

  const nodeType = typeof node.$type === 'string' ? node.$type : inheritedType;

  if (Object.hasOwn(node, '$value')) {
    const name = pathParts.join('.');

    if (tokenRecords.has(name)) {
      errors.push(`Duplicate token "${name}" found in ${relative(filePath)}.`);
      return;
    }

    tokenRecords.set(name, {
      name,
      path: pathParts,
      type: nodeType ?? 'unknown',
      layer,
      value: node.$value,
      description: node.$description,
      cssVariable: `--${cssVariablePrefix}-${toKebabCase(name)}`,
    });

    return;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) {
      continue;
    }

    collectTokens(value, [...pathParts, key], nodeType, filePath, layer);
  }
}

function resolveTokenValue(tokenName, stack) {
  const token = tokenRecords.get(tokenName);

  if (!token) {
    throw new Error(`Missing token reference "{${tokenName}}".`);
  }

  if (stack.includes(tokenName)) {
    throw new Error(`Circular token reference: ${[...stack, tokenName].join(' -> ')}.`);
  }

  if (typeof token.value === 'string') {
    const exactAlias = token.value.match(/^\{([^}]+)\}$/);

    if (exactAlias) {
      return resolveTokenValue(exactAlias[1], [...stack, tokenName]);
    }

    return token.value.replaceAll(/\{([^}]+)\}/g, (_, referenceName) => {
      const resolved = resolveTokenValue(referenceName, [...stack, tokenName]);
      return toCssValue(resolved, token.type);
    });
  }

  if (Array.isArray(token.value)) {
    return token.value.map((item) => resolveAliasesInValue(item, [...stack, tokenName]));
  }

  if (isPlainObject(token.value)) {
    return resolveAliasesInValue(token.value, [...stack, tokenName]);
  }

  return token.value;
}

function resolveAliasesInValue(value, stack) {
  if (typeof value === 'string') {
    const exactAlias = value.match(/^\{([^}]+)\}$/);

    if (exactAlias) {
      return resolveTokenValue(exactAlias[1], stack);
    }

    return value.replaceAll(/\{([^}]+)\}/g, (_, referenceName) => {
      const resolved = resolveTokenValue(referenceName, stack);
      return toCssValue(resolved, 'unknown');
    });
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveAliasesInValue(item, stack));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveAliasesInValue(item, stack)]),
    );
  }

  return value;
}

function toCssValue(value, type) {
  if (typeof value === 'number') {
    return shouldUsePixelUnit(type) ? `${value}px` : String(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => toCssValue(item, type)).join(', ');
  }

  if (isShadowValue(value)) {
    return [value.offsetX, value.offsetY, value.blur, value.spread, value.color]
      .filter((part) => part !== undefined)
      .join(' ');
  }

  if (isPlainObject(value)) {
    return Object.values(value)
      .map((part) => toCssValue(part, type))
      .join(' ');
  }

  return String(value);
}

function buildCssVariablesForToken(token) {
  const variables = {
    [token.cssVariable]: token.cssValue,
  };

  if (isPlainObject(token.resolvedValue)) {
    for (const [key, value] of Object.entries(flattenObject(token.resolvedValue))) {
      variables[`${token.cssVariable}-${toKebabCase(key)}`] = toCssValue(value, token.type);
    }
  }

  return variables;
}

function flattenObject(value, prefix = []) {
  if (!isPlainObject(value)) {
    return {
      [prefix.join('.')]: value,
    };
  }

  return Object.assign(
    {},
    ...Object.entries(value).map(([key, item]) => flattenObject(item, [...prefix, key])),
  );
}

function shouldUsePixelUnit(type) {
  return ['borderRadius', 'dimension', 'fontSize', 'lineHeight', 'shadow', 'spacing'].includes(
    type,
  );
}

function isShadowValue(value) {
  return (
    isPlainObject(value) &&
    ['offsetX', 'offsetY', 'blur', 'spread', 'color'].some((key) => Object.hasOwn(value, key))
  );
}

function toNestedTokenObject(records) {
  const root = {};

  for (const token of records) {
    let current = root;

    token.path.forEach((part, index) => {
      if (index === token.path.length - 1) {
        current[part] = token.resolvedValue;
        return;
      }

      current[part] ??= {};
      current = current[part];
    });
  }

  return root;
}

function buildTypescriptOutput(tokens, tokenList, cssVariables) {
  return `export type TokenValue = string | number | boolean | TokenValue[] | { readonly [key: string]: TokenValue };

export type Token = {
  readonly name: string;
  readonly path: readonly string[];
  readonly type: string;
  readonly layer: string;
  readonly value: TokenValue;
  readonly resolvedValue: TokenValue;
  readonly cssValue: string;
  readonly cssVariable: string;
  readonly cssVariables: Readonly<Record<string, string>>;
  readonly description?: string;
};

export const tokens = ${JSON.stringify(tokens, null, 2)} as const;

export const tokenList = ${JSON.stringify(tokenList, null, 2)} as const satisfies readonly Token[];

export const cssVariables = ${JSON.stringify(cssVariables, null, 2)} as const;
`;
}

function buildCssOutput(tokenList) {
  const lines = [':root {'];

  for (const token of tokenList) {
    for (const [cssVariable, cssValue] of Object.entries(token.cssVariables)) {
      lines.push(`  ${cssVariable}: ${cssValue};`);
    }
  }

  lines.push('}', '');

  return lines.join('\n');
}

function getLayerName(filePath) {
  const parts = filePath.split(path.sep);
  const layerName = parts.find((part) => layerNames.has(part));

  return layerName ?? 'unknown';
}

function toKebabCase(value) {
  return value
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll('.', '-')
    .replaceAll(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase();
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function relative(filePath) {
  return path.relative(packageRoot, filePath);
}
