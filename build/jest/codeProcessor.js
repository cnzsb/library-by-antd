const { createTransformer } = require('babel-jest');
const getBabelConfig = require('../babelConfig');

module.exports = {
  canInstrument: true,
  process(src, path, config, transformOptions) {
    const babelConfig = getBabelConfig();
    babelConfig.plugins.push('babel-plugin-dynamic-import-node');
    const babelJest = createTransformer(babelConfig);
    return babelJest.process(src, path, config, transformOptions);
  },
};
