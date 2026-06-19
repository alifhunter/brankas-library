import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const require = createRequire(import.meta.url);
const configDir = dirname(fileURLToPath(import.meta.url));
const storybookTsconfigPath = join(configDir, '../tsconfig.json');
const docgenInclude = [
  resolve(configDir, '../src/**/*.tsx'),
  resolve(configDir, '../../../packages/react/src/**/*.tsx'),
  resolve(configDir, '../../../packages/native/src/**/*.tsx'),
];
const docgenExclude = [
  '**/*.stories.tsx',
  '**/*.test.tsx',
  resolve(configDir, '../../../packages/react/src/**/*.stories.tsx'),
  resolve(configDir, '../../../packages/react/src/**/*.test.tsx'),
  resolve(configDir, '../../../packages/native/src/**/*.stories.tsx'),
  resolve(configDir, '../../../packages/native/src/**/*.test.tsx'),
];
const reactNativeWebPkg = require.resolve('react-native-web/package.json');
const reactNativeWebPath = join(dirname(reactNativeWebPkg), 'dist/index.js');
const gestureHandlerStubPath = resolve(configDir, 'stubs/gesture-handler.tsx');
const reanimatedStubPath = resolve(configDir, 'stubs/reanimated.tsx');
const reactNativeWebCommonJsDeps = [
  '@react-native/normalize-colors',
  'fbjs/lib/invariant',
  'fbjs/lib/warning',
  'inline-style-prefixer/lib/createPrefixer',
  'inline-style-prefixer/lib/plugins/crossFade',
  'inline-style-prefixer/lib/plugins/imageSet',
  'inline-style-prefixer/lib/plugins/logical',
  'inline-style-prefixer/lib/plugins/position',
  'inline-style-prefixer/lib/plugins/sizing',
  'inline-style-prefixer/lib/plugins/transition',
  'memoize-one',
  'nullthrows',
  'postcss-value-parser',
  'styleq',
  'styleq/transform-localize-style',
];

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
    '../../../packages/react/src/**/*.stories.@(ts|tsx)',
    '../../../packages/native/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: storybookTsconfigPath,
      include: docgenInclude,
      exclude: docgenExclude,
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => !/node_modules/.test(prop.parent?.fileName ?? ''),
    },
  },
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    const existingAlias = cfg.resolve.alias ?? {};
    const aliasArray = Array.isArray(existingAlias)
      ? existingAlias
      : Object.entries(existingAlias).map(([find, replacement]) => ({
          find,
          replacement: replacement as string,
        }));
    cfg.resolve.alias = [
      { find: /^react-native$/, replacement: reactNativeWebPath },
      { find: /^react-native-gesture-handler($|\/.*)/, replacement: gestureHandlerStubPath },
      { find: /^react-native-reanimated($|\/.*)/, replacement: reanimatedStubPath },
      ...aliasArray,
    ];
    cfg.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(cfg.resolve.extensions ?? ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']),
    ];
    cfg.define = {
      ...(cfg.define ?? {}),
      __DEV__: 'true',
    };
    cfg.optimizeDeps = cfg.optimizeDeps ?? {};
    cfg.optimizeDeps.include = [
      ...(cfg.optimizeDeps.include ?? []),
      'react-native-web',
      ...reactNativeWebCommonJsDeps.map((dependency) => `react-native-web > ${dependency}`),
      'react-native-svg',
    ];
    cfg.optimizeDeps.needsInterop = [
      ...(cfg.optimizeDeps.needsInterop ?? []),
      'react-native-web',
      'fbjs',
      'inline-style-prefixer',
      ...reactNativeWebCommonJsDeps,
    ];
    cfg.optimizeDeps.esbuildOptions = {
      ...(cfg.optimizeDeps.esbuildOptions ?? {}),
      mainFields: ['module', 'main'],
      resolveExtensions: [
        '.web.js',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.ts',
        '.tsx',
        '.json',
      ],
    };
    cfg.optimizeDeps.exclude = [
      ...(cfg.optimizeDeps.exclude ?? []),
      'react-native',
    ];
    return cfg;
  },
};

export default config;
