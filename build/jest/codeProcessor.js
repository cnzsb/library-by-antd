const { createTransformer } = require('babel-jest');
const getBabelConfig = require('../babelConfig');

module.exports = {
  canInstrument: true,
  process(src, path, config, transformOptions) {
    const babelConfig = getBabelConfig();
    const babelJest = createTransformer(babelConfig);
    return babelJest.process(src, path, config, transformOptions);
  },
};
