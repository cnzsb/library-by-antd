const merge = require('webpack-merge');

const { resolvePath } = require('./utils/pathUtil');
const config = require('./config');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    [config.name]: resolvePath('./index'),
  },
});
