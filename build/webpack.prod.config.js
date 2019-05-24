const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { resolvePath } = require('./utils/pathUtil');
const config = require('./config');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    [`${config.name}.min`]: resolvePath('./index'),
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});
