const path = require('path');
const pkg = require('../package');

function resolvePath(...dir) {
  return path.resolve(__dirname, '..', ...dir);
}

module.exports = {
  name: 'lba',
  components: resolvePath('./components'),
  pkgName: pkg.name,
  version: pkg.version,

  // when modifying it
  // please modify 'theme-prefix' in 'components/style/themes.less'
  // and  'THEME_PREFIX' in 'components/config-provider/index.js'
  themePrefixCls: 'lba',
  modifyVars: {
    // https://github.com/ant-design/ant-design/issues/16464
    'hack': `true; @import '${resolvePath('components/style/themes.less')}'`,
  },

  svgOptions: {
    limit: 10000,
    mimetype: 'image/svg+xml',
  },
  imageOptions: {
    limit: 10000,
  }
};
