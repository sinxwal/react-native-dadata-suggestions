module.exports = {
    root: true,
    env: {
      es6: true,
      jest: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
      '@react-native-community',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier/@typescript-eslint'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    // overrides: [
    //   {
    //     files: ['*.ts', '*.tsx'],
    //     rules: {
    //       '@typescript-eslint/explicit-function-return-type': ['error'],
    //     },
    //   },
    // ],
  };
  