var gulp = require('gulp'),
	 sass = require('gulp-sass'),
	 concat = require('gulp-concat'),
	 uglify = require('gulp-uglifyjs'),
	 cssnano = require('gulp-cssnano'),
	 rename = require('gulp-rename'),
	 del = require('del'),
	 imagemin = require('gulp-imagemin'),
	 pngquant = require('imagemin-pngquant'),
	 cache = require('gulp-cache'),
	 autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () { 
	return gulp.src('src/scss/**/*.scss') // источник scss
		.pipe(sass()) // применяем sass
		.pipe(gulp.dest('src/css/')) // закидываем готовый css файл
});

gulp.task('css-libs', function () {
	return gulp.src('src/scss/libs.scss')
		.pipe(sass())
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('src/css/'))
});


gulp.task('clean', async function () {
	return del.sync('dist');
});


gulp.task('scripts', function () {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/slick-carousel/slick/slick.min.js'
		])
		.pipe(concat('libs.min.js')) // конкатенируем
		.pipe(uglify()) // сжимаем
		.pipe(gulp.dest('src/js/'));
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]	
			})))
		.pipe(gulp.dest('dist/img'))
});

gulp.task('prebuild', async function () {
	var buildCss = gulp.src([
		'src/css/main.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var builsJs = gulp.src('src/js/*')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('clear', function () {
	return cache.returnAll();
});

gulp.task('watch', async function () {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('css-libs','sass', 'scripts', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));