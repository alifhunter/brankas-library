const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch the whole monorepo so Metro picks up edits to @brankas/native.
config.watchFolders = [workspaceRoot];

// 2. Resolve modules from both the app's and the workspace's node_modules.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. pnpm uses symlinks for workspace packages; Metro needs both flags.
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 4. Enable require.context() so cases/ can be auto-discovered.
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
