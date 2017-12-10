var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var config = {
  path: {
    styles: './src/styles/**/*.scss',
    html: './index.html'
  },
  output: {
    cssFile: 'app.min.css',
    cssPath: './dest/css/',
    homeDir: './'
  }
};

gulp.task('scss', function() {
  return gulp.src(config.path.styles)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: false, outputStyle: 'compressed'}))
    .on('error', function(err) {
        notify().write(err);
        this.emit('end');
    })
    .pipe(concat(config.output.cssFile))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.output.cssPath))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: config.output.homeDir
    }
  });

  gulp.watch(config.path.styles, ['scss']);
  gulp.watch(config.path.html).on('change', browserSync.reload);
});

gulp.task('default', ['scss', 'serve']);


// todo
// 1. csslinter
// 2. can i use
