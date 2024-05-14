const { default: Prettierrc } = require("./.prettierrc.cjs");

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:tsdoc/recommended',
    // 'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'tsdoc', 'prettier',],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'explicit',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    'no-shadow': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase', 'UPPER_CASE'],
        prefix: [
          'is',
          'should',
          'has',
          'can',
          'did',
          'will',
          'does',
          'IS',
          'SHOULD',
          'HAS',
        ],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    'new-cap': 'error',
    'tsdoc/syntax': 'error',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
