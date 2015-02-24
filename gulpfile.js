var gulp = require('gulp'),
	server = require('gulp-express'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	autoprefixer = require('gulp-autoprefixer'),
	app = require('./app');

gulp.task('sass', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(sass({
			style: 'expanded',
			errLogToConsole: true
		}))
		.pipe(gulp.dest('public/stylesheets'))
		.pipe(server.notify());
});

gulp.task('lint', function() {
	return gulp.src('public/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(server.notify());
});

gulp.task('server', function () {
	// Start the server at the beginning of the task
	server.run(['./bin/www']);

	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('public/js/*.js',['lint']);

});

gulp.task('default', ['sass', 'lint', 'server'], function() {

});