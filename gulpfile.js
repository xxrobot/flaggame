const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

//gulp dependencies go here

gulp.task('default', function(){
	//gulp tasks go here

	//run eslint
	gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
		.pipe(eslint())
		.pipe(eslint.format());

	//Node Source
	gulp.src("es6/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("dist"));

	//browser source
	gulp.src("public/es6/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest("public/dist"));


});

gulp.task('asdf', function() {
    gulp.watch('public/**/*.*', ['default'])
});