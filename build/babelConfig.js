const { browserslist: browsers } = require('../package');
const replaceLib = require('./utils/replaceLib');

module.exports = function (modules = 'auto') {
  const plugins = [
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    [
      '@babel/plugin-proposal-optional-chaining',
      {
        'loose': false,
      },
    ],
    [
      '@babel/plugin-proposal-pipeline-operator',
      {
        'proposal': 'minimal',
      },
    ],
    [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      {
        'loose': false,
      },
    ],
    '@babel/plugin-proposal-do-expressions',
    [
      '@babel/plugin-proposal-decorators',
      {
        'legacy': true,
      },
    ],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-proposal-class-properties',
      {
        'loose': true,
      },
    ],
    '@babel/plugin-proposal-json-strings',
  ];

  if (modules === false) plugins.push(replaceLib);

  return {
    'presets': [
      [
        '@babel/env',
        {
          modules,
          targets: { browsers },
        },
      ],
      '@babel/react',
    ],
    plugins,
  };

};
