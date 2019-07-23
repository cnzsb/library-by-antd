const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolvePath } = require('./utils/pathUtil');
const config = require('./config');
const babelConfig = require('./babelConfig')(false);
const postcssConfig = require('./postcssConfig');

// babel import for components
babelConfig.plugins.push([
  'babel-plugin-import',
  {
    style: 'css',
    libraryName: config.pkgName,
    libraryDirectory: 'components',
  },
  config.pkgName,
]);

const svgOptions = {
  limit: 10000,
  mimetype: 'image/svg+xml',
};

const imageOptions = {
  limit: 10000,
};

module.exports = {
  devtool: 'source-map',
  output: {
    path: resolvePath('dist'),
    filename: '[name].js',
    library: config.name,
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, resolvePath('./index')],
        options: babelConfig,
      },
      {
        test: /\.css$/,
        include: [resolvePath('components'), /node_modules\/antd/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ...postcssConfig,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [resolvePath('components'), /node_modules\/antd/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ...postcssConfig,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: config.modifyVars,
            },
          },
        ],
      },

      // images
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: svgOptions,
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: imageOptions,
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new WebpackBar({
      name: `🚚  Build ${config.name}`,
      color: '#1F8DFB',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
  ],
};

module.exports.svgOptions = svgOptions;
module.exports.imageOptions = imageOptions;
