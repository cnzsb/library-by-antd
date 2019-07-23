const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.join(__dirname, '..'),
  setupFiles: ['<rootDir>/test/setup.js'],
  moduleFileExtensions: ['js', 'jsx'],
  modulePaths: ['<rootDir>/components/'],
  moduleNameMapper: {
    // '\\.(eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^.+\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.jsx?$': '<rootDir>/build/jest/codeProcessor',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/build/jest/imageProcessor',
  },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(some_modules))[^/]+?/(?!(es|esm|node_modules)/)',  // Ignore modules without es dir
  // ],
  collectCoverageFrom: [
    'components/**/*.js',
    '!components/*/style/index.js',
    '!components/style/index.js',
    '!components/*/locale/index.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
};
