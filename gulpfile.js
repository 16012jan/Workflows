var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    source = require('vinyl-source-stream'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify');
    jsonminify = require('gulp-jsonminify');
    minifyHTML = require('gulp-minify-html');
    gulpif = require('gulp-if');

var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    sassStyle,
    outputDir;

var env = process.env.NODE_ENV || 'development';

if (env==='development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
}
else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

coffeeSources = ['components/coffee/tagline.coffe'];
jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/tagline.js',
    'components/scripts/pixgrid.js',
    'components/scripts/template.js'
];

sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [ outputDir + 'js/*.json'];

gulp.task('coffee', function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('compass', function(){
  gulp.src(sassSources)
    .pipe(compass({
        sass: 'components/sass',
        images: outputDir + 'images',
        style: sassStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
});
gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch('builds/development/*.html', ['html']);
    gulp.watch('builds/development/js/*.json', ['json']);
});

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function(){
    gulp.src('builds/development/*.html')
    .pipe(gulpif(env === 'production', minifyHTML()))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload())
});

gulp.task('json', function(){
    gulp.src('builds/development/js/*.json')
    .pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulpif(env === 'production', gulp.dest('builds/production/js')))
    .pipe(connect.reload())
});

gulp.task('default', ['json','coffee', 'js', 'compass', 'connect', 'watch', 'html']);
