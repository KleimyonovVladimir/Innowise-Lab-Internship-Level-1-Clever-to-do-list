module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'react-app', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'simple-import-sort'],
  rules: {
    'no-unused-vars': 1,
    'arrow-body-style': 1,
    'import/no-anonymous-default-export': 0,
    'import/no-unresolved': 0,
    'react/destructuring-assignment': 1,
    'react/self-closing-comp': 1,
    'react/require-default-props': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'class-methods-use-this': 0,
    'multiline-ternary': 0,
    'react/no-array-index-key': 0,
    // Sort imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    camelcase: 2,
    'no-nested-ternary': 1,
    'no-param-reassign': 2,
    'no-empty-pattern': 1,
    'no-shadow': 0,
    'prettier/prettier': 0
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    }
  ]
}
