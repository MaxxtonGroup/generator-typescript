'use strict'

/**
 * Requirements
 */
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var merge = require('merge2');
var tsd = require('gulp-tsd');
var sass = require('gulp-sass');

/**
 * Load configuration
 */
var config = require('./gulp.conf.json');

/**
 * Default task
 */
gulp.task('default', ['install']);

/**
 * Other tasks
 */

gulp.task('install', function(callback) {
	tsd({
		command: 'reinstall',
		config: './tsdconfig.json'
	}, callback);
});

gulp.task('compile', function() {
	if(config.sass) {
		if(config.projecttype === "app") {
			gulp.src('src/sass/' + config.projectname + '.scss').pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest('public/assets/css'));
		} else {
			gulp.src('src/sass/' + config.projectname + '.scss').pipe(sass.sync().on('error', sass.logError)).pipe(gulp.dest('dist'));
		}
	}
	
	var result = gulp.src('src/' + config.projectname + '.d.ts').pipe(tsc('tsconfig.json'));
	if(config.projecttype === "app") {
		return result.js.pipe(gulp.dest('public/assets/js/'));
	}else{
		return merge([result.dts.pipe(gulp.dest('dist/')), result.js.pipe(gulp.dest('dist/'))]);
	}
});

gulp.task('compile-watch', ['compile'], function() {
	
});

gulp.task('test', function() {
	gulp.watch('src/**/*.ts', ['']);
});

gulp.task('test-watch', ['test'], function() {
	
});