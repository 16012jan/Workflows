var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    browserify = require('browserify');

var coffeeSources = ['components/coffee/tagline.coffe'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/tagline.js',
    'components/scripts/pixgrid.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss']

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
  gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
        images: 'builds/development/images',
        style: 'expanded'
    })
    .on('error', gutil.log))
    .pipe(gulp.dest('builds/development/css'))
});
gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
});
gulp.task('all', ['coffee', 'js', 'compass']);
