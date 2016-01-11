'use strict';

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var liveServer = require('gulp-live-server');
var embedTemplates = require('gulp-angular-embed-templates');
var sass = require('gulp-sass');
var merge = require('merge2');
var clean = require('gulp-rimraf');

var tsconfig = require('./tsconfig.json');

gulp.task('default', ['compile', 'run']);

gulp.task('compile', ['compile-sass', 'compile-typescript', 'compile-assets', 'compile-html', 'compile-package'], function(){
  gulp.watch(['src/**/*.ts', 'src/**/*.html'], ['compile-typescript']);
  gulp.watch('src/assets/scss/**/*.scss', ['compile-sass']);
  gulp.watch(['src/assets/fonts/**/**', 'src/assets/images/**/**'], ['compile-assets']);
  gulp.watch('src/index.html', ['compile-html']);
  gulp.watch(['package.json', 'LICENSE', 'README.md'], ['compile-package'])
});

gulp.task('compile-typescript', [], function(){
  var result = gulp.src('src/**/*.ts').pipe(sourcemaps.init()).pipe(typescript(tsconfig));
  return merge([
    result.dts.pipe(gulp.dest('dist')),
    result.js.pipe(embedTemplates()).pipe(sourcemaps.write('.', {sourceRoot: '/src'})).pipe(gulp.dest('dist'))
  ]);
});

gulp.task('compile-sass', [], function(){
  return gulp.src('src/assets/scss/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('dist/assets/css'));
});

gulp.task('compile-assets', [], function() {
  gulp.src('src/assets/fonts/**/**').pipe(gulp.dest('dist/assets/fonts'));
  return gulp.src('src/assets/images/**/**').pipe(gulp.dest('dist/assets/images'));
});

gulp.task('compile-html', [], function(){
  return gulp.src('src/index.html').pipe(gulp.dest('dist'));
});

gulp.task('compile-package', [], function() {
  return gulp.src(['package.json', 'LICENSE', 'README.md']).pipe(gulp.dest('dist'));
});

gulp.task('run', [], function(){
  var server = liveServer.static(['dist', 'node_modules'], 3000);
  server.start();

  gulp.watch('dist/**/**', function(file){
    server.notify.apply(server, [file]);
  });
});

gulp.task('clean', [], function(){
  return gulp.src('dist', {read:false}).pipe(clean());
})

gulp.task('test', [], function(){

});