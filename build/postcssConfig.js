const { browserslist: browsers } = require('../package');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({ browsers }),
  ],
};
