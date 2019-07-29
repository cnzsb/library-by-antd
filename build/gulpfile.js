const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const merge2 = require('merge2');
const through2 = require('through2');
const webpack = require('webpack');

const config = require('./config');
const getBabelConfig = require('./babelConfig');
const { cssInjection } = require('./utils/styleUtil');
const transformLess = require('./utils/transformLess');
const webpackProdConfig = require('./webpack.prod.config');
const webpackDevConfig = require('./webpack.dev.config');
const { resolvePath } = require('./utils/pathUtil');

const libDir = resolvePath('lib');
const esDir = resolvePath('es');

function compile(modules) {
  const dest = modules === false ? esDir : libDir;
  rimraf.sync(dest);
  const less = gulp
    .src(['../components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(dest));
  const assets = gulp
    .src(['../components/**/*.@(png|svg)'])
    .pipe(gulp.dest(dest));

  const js = gulp.src(['../components/**/*.@(js|jsx)', '!../components/**/__tests__/**', '!../components/**/__mocks__/**'])
    .pipe(babel(getBabelConfig(modules)))
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);

          file.contents = Buffer.from(cssInjection(content));
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          next();
        } else {
          next();
        }
      }),
    ).pipe(gulp.dest(dest));

  return merge2([less, js, assets]);
}

gulp.task('compile:es', (done) => {
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile:lib', (done) => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile:finalize', (done) => {
  console.log('[Compile] Finalization...');

  // Build a entry less file to dist/antd.less
  const componentsPath = resolvePath('components');
  let componentsLessContent = '';
  // Build components in one file: lib/style/components.less
  fs.readdir(componentsPath, (err, files) => {
    files.forEach(file => {
      if (fs.existsSync(resolvePath(componentsPath, file, 'style/index.less'))) {
        componentsLessContent += `@import "../${path.join(file, 'style/index.less')}";\n`;
      }
    });
    fs.writeFileSync(
      resolvePath('lib/style/components.less'),
      componentsLessContent,
    );
  });

  done();
});

gulp.task('compile', gulp.series(gulp.parallel(['compile:es', 'compile:lib']), 'compile:finalize'));

gulp.task('dist:compile', (done) => {
  rimraf.sync(resolvePath('dist'));
  process.env.RUN_ENV = 'PRODUCTION';
  const webpackConfig = [webpackProdConfig, webpackDevConfig];
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/39
      entrypoints: false,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false,
    });
    console.log(buildInfo);

    done();
  });
});

gulp.task('dist:finalize', (done) => {
  console.log('[Dist] Finalization...');

  if (fs.existsSync(resolvePath('./dist'))) {
    // Build less entry file: dist/libraryName.less
    fs.writeFileSync(
      resolvePath(`dist/${config.name}.less`),
      '@import "../lib/style/index.less";\n@import "../lib/style/components.less";',
    );

    // eslint-disable-next-line
    console.log(`Built a entry less file to dist/${config.name}.less`);
  }

  done();
});

gulp.task('dist', gulp.series('dist:compile', 'dist:finalize'));

gulp.task('build', gulp.series(gulp.parallel(['compile', 'dist'])));
