module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'indent': ['error', 2],
    'vetur.validation.template': false,
    'no-var': 'error'// 禁用var，用let和const代替
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
