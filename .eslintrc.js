module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'airbnb-base'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'vue/html-self-closing': 0,
    'no-param-reassign': 0,
  },
};
