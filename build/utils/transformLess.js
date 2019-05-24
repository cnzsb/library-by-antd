const less = require('less');
const { readFileSync } = require('fs');
const postcss = require('postcss');
const NpmImportPlugin = require('less-plugin-npm-import');

const config = require('../config');
const postcssConfig = require('../postcssConfig');
const { resolvePath } = require('./pathUtil');

function transformLess(lessFile) {
  const resolvedLessFile = resolvePath(lessFile);

  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');

  // Do less compile
  const lessOpts = {
    paths: [resolvedLessFile],
    filename: resolvedLessFile,
    plugins: [new NpmImportPlugin({ prefix: '~' })],
    javascriptEnabled: true,
    modifyVars: config.modifyVars,
  };
  return less
    .render(data, lessOpts)
    .then(result => postcss(postcssConfig.plugins).process(result.css, { from: undefined }))
    .then(r => r.css);
}

module.exports = transformLess;
