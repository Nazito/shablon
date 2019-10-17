// 1. gulpfile и package положить рядом с папокой-верстки(psy)
// 2. установить все зависмости "npm i" 
// 3. liveroload и компилятор запускается командок "gulp"

var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
autoprefixer = require('gulp-autoprefixer'),
bourbon = require('node-bourbon'),
notify = require("gulp-notify"),
sourcemaps = require('gulp-sourcemaps');



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		// tunnel: true
		notify: false,
		directory: true
	});

});



gulp.task('sass', function () {
  return gulp.src('app/scss/*.+(scss|sass)') // Выборка исходных файлов для обработки плагином
  .pipe(sourcemaps.init())   // Для генераии style.css.map
  .pipe(sass({includePaths: bourbon.includePaths}).on("error", notify.onError())) 
    .pipe(autoprefixer(['last 100 versions', '> 10%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
    .pipe(sourcemaps.write('./')) // Куда положить .map
    .pipe(gulp.dest('app/css')) // Вывод результирующего файла в папку назначения (dest - пункт назначения)
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('watch', ['sass','browser-sync'], function() {
	gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']); 
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
});





gulp.task('default', ['watch']);