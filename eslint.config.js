module.exports = [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      '**/coverage/**',
      '**/test-results/**',
      '.DS_Store'
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    env: {
      browser: true,
      node: true,
      es2024: true,
      jest: true
    },
    plugins: {
      react: require('eslint-plugin-react')
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
];
