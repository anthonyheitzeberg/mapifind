// https://docs.expo.dev/guides/using-eslint/
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  ...expoConfig,
  eslintConfigPrettier,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*', 'ios/*', 'android/*'],
  },
  {
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['src/navigation/types.ts'],
    rules: {
      // Augmenting @react-navigation's ambient RootParamList requires an
      // empty `extends` interface; this is the documented pattern.
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];
