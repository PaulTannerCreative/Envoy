var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      browsers: ['> 5%', 'not ie <= 8'],
      remove: false
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  });
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./js/**/*.js', browserSync.reload);
});