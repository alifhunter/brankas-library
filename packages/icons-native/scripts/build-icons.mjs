#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const svgDir = join(root, 'svg');
const outDir = join(root, 'src', 'icons', 'generated');

if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const toComponentName = (filename) =>
  filename
    .replace(/\.svg$/, '')
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Icon';

const PRIMITIVE_TAGS = new Set([
  'path',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'ellipse',
  'g',
  'defs',
  'lineargradient',
  'radialgradient',
  'stop',
  'clippath',
  'mask',
]);

const toJsxAttr = (name) => {
  if (name === 'class') return 'className';
  if (name.includes('-')) {
    const [head, ...rest] = name.split('-');
    return head + rest.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  }
  return name;
};

const tagToImport = (tag) => {
  const map = {
    lineargradient: 'LinearGradient',
    radialgradient: 'RadialGradient',
    clippath: 'ClipPath',
  };
  if (map[tag]) return map[tag];
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};

const transformSvgBody = (svgText) => {
  const inner = svgText.replace(/^[\s\S]*?<svg[^>]*>/i, '').replace(/<\/svg>\s*$/i, '');
  const usedTags = new Set();
  const transformed = inner.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g, (match, tag, attrs) => {
    const lowered = tag.toLowerCase();
    if (!PRIMITIVE_TAGS.has(lowered)) return match;
    const componentName = tagToImport(lowered);
    usedTags.add(componentName);
    const isClosing = match.startsWith('</');
    if (isClosing) return `</${componentName}>`;
    const isSelfClosing = match.endsWith('/>');
    const cleanedAttrs = attrs.replace(/\/\s*$/, '').trim();
    const transformedAttrs = cleanedAttrs.replace(/([a-zA-Z][a-zA-Z0-9:-]*)="([^"]*)"/g, (_m, name, val) => {
      const jsxName = toJsxAttr(name);
      return `${jsxName}="${val}"`;
    });
    const attrsPart = transformedAttrs ? ` ${transformedAttrs}` : '';
    return `<${componentName}${attrsPart}${isSelfClosing ? ' />' : '>'}`;
  });
  return { body: transformed.trim(), imports: Array.from(usedTags) };
};

const files = existsSync(svgDir) ? readdirSync(svgDir).filter((f) => f.endsWith('.svg')) : [];
const exportLines = [];

for (const file of files) {
  const componentName = toComponentName(file);
  const svgText = readFileSync(join(svgDir, file), 'utf8');
  const { body, imports } = transformSvgBody(svgText);
  const otherImports = imports.filter((i) => i !== 'Svg');
  const importLine =
    otherImports.length > 0
      ? `import { ${otherImports.join(', ')} } from 'react-native-svg';\n`
      : '';
  const componentSource = `import { Icon, type IconProps } from '../../Icon.js';
${importLine}
export function ${componentName}(props: IconProps) {
  return (
    <Icon {...props}>
      ${body}
    </Icon>
  );
}
`;
  writeFileSync(join(outDir, `${componentName}.tsx`), componentSource);
  exportLines.push(`export { ${componentName} } from './${componentName}.js';`);
}

const indexBody = exportLines.length > 0 ? exportLines.join('\n') + '\n' : 'export {};\n';
writeFileSync(join(outDir, 'index.ts'), indexBody);

console.log(`Generated ${files.length} icon(s) into ${outDir}`);
