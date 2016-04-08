var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    browserify = require('browserify');

var coffeeSources = ['components/coffee/tagline.coffe'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/tagline.js',
    'components/scripts/pixgrid.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

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
    .pipe(connect.reload())
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
    .pipe(connect.reload())
});
gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function(){
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

gulp.task('html', function(){
    gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('json', function(){
    gulp.src(jsonSources)
    .pipe(connect.reload())
});

gulp.task('default', ['json','coffee', 'js', 'compass', 'connect', 'watch', 'html']);
