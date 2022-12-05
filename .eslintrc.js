const getExtends = (vue) => {
  let result = [
    ['eslint:recommended', false],
    ['plugin:vue/vue3-recommended', true],
    ['plugin:prettier/recommended', false],
  ];

  if (!vue) {
    result = result.filter((e) => !e[1]);
  }

  return result.map((e) => e[0]);
};

const getRules = (vue) => {
  const rules = {};
  const vueRules = {};

  return vue ? { ...rules, ...vueRules } : rules;
};

const sharedSettings = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
    },
  },
};

module.exports = {
  ...sharedSettings,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: getExtends(false),
  rules: getRules(false),
  overrides: [
    {
      ...sharedSettings,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      env: {
        node: true,
        es6: true,
      },
      parser: 'vue-eslint-parser',
      files: ['resources/js/**/*.vue'],
      extends: getExtends(true),
      rules: getRules(true),
    },
    {
      ...sharedSettings,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      env: {
        node: true,
        es6: true,
      },
      files: ['resources/js/**/*.js'],
      extends: getExtends(false),
      rules: getRules(false),
    },
  ],
};
