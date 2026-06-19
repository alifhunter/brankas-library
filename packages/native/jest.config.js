/** @type {import('jest').Config} */
export default {
  preset: '@react-native/jest-preset',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@brankas/tokens$': '<rootDir>/../tokens/dist/index.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.pnpm/(react-native|@react-native|react-native-svg)|(react-native|@react-native|react-native-svg)/)',
  ],
};
