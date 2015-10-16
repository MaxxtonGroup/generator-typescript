'use strict'

/**
 * Requirements
 */
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var merge = require('merge2');
var tsd = require('gulp-tsd');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var karma = require("gulp-karma-runner"); 

/**
 * Load configuration
 */
var config = require('./gulp.conf.json');

/**
 * Functions
 */

function getBuildDir() {
	if(config.projecttype === "app") {
		return 'public/**/*.js';
	}else{
		return 'dist/**/*.js';
	}
}

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
		"latest": true,
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
	
	var test = gulp.src('test/' + config.projectname + '-test.ts').pipe(tsc('tsconfig.json'));
	test.js.pipe(gulp.dest('test/build'));
	
	var result = gulp.src('src/' + config.projectname + '.d.ts').pipe(sourcemaps.init()).pipe(tsc('tsconfig.json'));
	if(config.projecttype === "app") {
		return result.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('public/assets/js/'));
	}else{
		return merge([result.dts.pipe(gulp.dest('dist/')), result.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('dist/'))]);
	}
});

gulp.task('compile-watch', ['compile'], function() {
	gulp.watch('src/**/*.ts', ['compile']);
	gulp.watch('src/sass/**/*.scss', ['compile']);
});

gulp.task('test', ['compile'], function() {
	gulp.src(config.karmafiles, {"read": false}).pipe(
		karma.server({
			'singleRun': false,
			'quit': true,
			'frameworks': ['mocha', 'chai'],
      'browsers': ['Chrome'],
				'reporters': ['progress', 'coverage'],
				'preprocessors': { <% if (projecttype === "app") { %>'public/assets/js/<%= projectname %>.js'<% } else { %>'dist/<%= projectname %>.js'<% } %>: ['coverage'] },
				'coverageReporter': { type: 'html', dir: 'test/report/' }
		})
	);
});

gulp.task('test-watch', ['test'], function() {
	gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['compile'], function() {
		gulp.src(config.karmafiles, {"read": false}).pipe(
			karma.runner({
				'singleRun': false,
				'frameworks': ['mocha', 'chai'],
				'browsers': ['Chrome'],
				'reporters': ['progress', 'coverage'],
				'preprocessors': { <% if (projecttype === "app") { %>'public/assets/js/<%= projectname %>.js'<% } else { %>'dist/<%= projectname %>.js'<% } %>: ['coverage'] },
				'coverageReporter': { type: 'html', dir: 'test/report/' }
			})
		);
	});
});