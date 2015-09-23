'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var tsd = require('gulp-tsd');
var tsc = require('gulp-typescript');
var Server = require('karma').Server;
var sass = require('gulp-sass');
var merge = require('merge2');
var browser = require('browser-sync').create();

/**
 * Maxxton project script based on GULP.
 * 
 * @Author: R. Hermans (r.hermans@maxxton.com)
 * @Copyright: Maxxton Group 2015
 */

// Tasks to install the project in the current directory
gulp.task('install', ['install-public', 'install-source', 'install-test']);
gulp.task('install-public', function() { return bower({cwd: 'public', cmd: 'install'}).pipe(gulp.src(['public/libraries/**/*'], {cwd: '.'})).pipe(gulp.dest('test/typescript/build/libraries')); });
gulp.task('install-source', function() { return gulp.src('tsd.json', { cwd: 'src/typescript'}).pipe(tsd()).pipe(gulp.src(['src/typescript/typings/**/*'], {cwd: '.'})).pipe(gulp.dest('test/typescript/typings')) });
gulp.task('install-test', function() {  return bower({cwd: 'test/typescript', cmd: 'install'}).pipe(gulp.src('tsd.json', { cwd: 'test/typescript'}).pipe(tsd())); });

// Tasks to compile and run the source code.
gulp.task('run', function() {
	browser.init({server: "./public"});
	gulp.watch('src/typescript/src/**/*.ts', ['compile-typescript']);
	gulp.watch('src/sass/src/**/*.scss', ['compile-sass']);
	gulp.watch('public/**/*.html').on('change', browser.reload);
});

gulp.task('compile-typescript', function() {
	var result = gulp.src('src/typescript/src/**/*.ts').pipe(tsc({out: 'app.js', declaration: true}));
	result = merge([ result.dts.pipe(gulp.dest('public/resources/js/')).pipe(gulp.dest('test/typescript/typings/app')), result.js.pipe(gulp.dest('public/resources/js/')).pipe(gulp.dest('test/typescript/build/')) ]);
	return result.pipe(browser.stream());
});

gulp.task('compile-sass', function(){
	gulp.src('src/sass/src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/resources/css/'));
});

// Tasks to compile and run the test code.
gulp.task('test', function() {
	gulp.watch('test/typescript/src/**/*.ts', ['compile-test']);
	new Server({configFile: __dirname + '/test/typescript/karma.conf.js', singleRun: false}).start();
});

gulp.task('compile-test', function(){
	var result = gulp.src('test/typescript/src/**/*.ts').pipe(tsc({out: 'app-test.js'}));
	return result.js.pipe(gulp.dest('test/typescript/build/'));
});

// Default task that gets triggered if no task parameter has been given.
gulp.task('default', ['install', 'run'])