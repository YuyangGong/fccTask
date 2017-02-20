const gulp = require('gulp'),
	  babel = require('gulp-babel'),
	  uglify = require('gulp-uglify'),
	  htmlmin = require('gulp-htmlmin');

gulp.task('jsTask', _ => {
	return gulp.src('js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('cssTask', _ => {
	return gulp.src('css/*.css')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('htmlTask', _ => {
	return gulp.src('*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			collapseInlineTagWhitespace: true,
			conservativeCollapse: true
		}))
		.pipe(gulp.dest('dist'));
})

gulp.task('imgTask', _ => {
	return gulp.src('img/*')
		.pipe(gulp.dest('dist/img'))
})

gulp.task('default', ['htmlTask', 'cssTask', 'jsTask', 'imgTask'], _ => {})

gulp.watch('js/*.js', ['jsTask']);
gulp.watch('css/*.css', ['cssTask']);
gulp.watch('*.html', ['htmlTask']);
gulp.watch('img/*', ['imgTask']);