'use strict';

let gulp = require('gulp');
let connect = require('gulp-connect'); // runs a local dev server
let open = require('gulp-open'); // opens url in browser
let source = require('vinyl-source-stream');
let concat = require('gulp-concat');
let babelify = require('babelify');
let browserify = require('browserify');


/*
  gulp configuration settings
*/
let config = {
  port: 8080,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'src/css/'
    ],
    dist: './dist'
  }
};


gulp.task('open', ['connect'], () => {
  gulp.src('dist/index.html')
    .pipe(open({ url: `${config.devBaseUrl}:${config.port}/` }));
});

/*
  Put all the html files in the dist directory
  and reload the dev server
*/
gulp.task('html', () => {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js', ()=> {
  browserify({
    entries: './src/index.jsx',
    extensions: ['.js', '.jsx'],
    debug: true
  })
  .transform(babelify.configure({
    ignore: /(bower_components)|(node_modules)/
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(`${config.paths.dist}/scripts`))
  .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(`${config.paths.dist}/css`));
});


gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'js', 'css', 'watch']);
