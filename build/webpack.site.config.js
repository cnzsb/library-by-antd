const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolvePath } = require('./utils/pathUtil');

module.exports = {
  devtool: 'source-map',
  entry: resolvePath('site/index.js'),
  output: {
    filename: 'bundle.js',
    path: resolvePath('_site'),
  },
  devServer: {
    port: 4000,
    contentBase: resolvePath('_site'),
    hot: true,
    inline: true,
  },
  resolve: {
    alias: {
      'library-by-antd': resolvePath(),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolvePath('site'),
        exclude: /node_modules/,
        options: {
          'presets': [
            '@babel/env',
            '@babel/react',
          ],
          plugins: [
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
            [
              'babel-plugin-import',
              {
                'libraryName': 'library-by-antd',
                'style': 'css',
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendors',
      minSize: 30000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('site/template.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
