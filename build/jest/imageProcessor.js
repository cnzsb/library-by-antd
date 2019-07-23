const urlLoader = require('url-loader');
const { svgOptions, imageOptions } = require('../webpack.config');

module.exports = {
  process(src, filename) {
    const instance = {
      resourcePath: filename,
    };
    if (/.svg/.test(filename)) {
      instance.query = svgOptions;
    } else {
      instance.query = imageOptions;
    }
    return urlLoader.call(instance, src);
  },
};
