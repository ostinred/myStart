const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      plumber = require('gulp-plumber'),
      browserSync = require('browser-sync').create();

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
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
