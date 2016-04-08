var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

var coffeSources = ['components/coffee/tagline.coffe'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/tagline.js',
    'components/scripts/pixgrid.js',
    'components/scripts/template.js'
];

gulp.task('coffee', function(){
  gulp.src(coffeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'))
});
