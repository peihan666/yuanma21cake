const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');



//新建sass任务

gulp.task('sass',()=>{
	gulp.src('./src/sass/*.scss')
	.pipe(sass()).pipe(cssnano())
	.pipe(rename({"suffix" : ".min"}))
	.pipe(gulp.dest('./dist/css'));
})
gulp.task('default',()=>{
	gulp.watch('./src/sass/*.scss',['sass']);
	
})
//新建压缩js任务
gulp.task('js',function(){
	gulp.src('./src/js/*.js').pipe(concat('index.min.js')).pipe(uglify()).pipe(gulp.dest('./dist/js'));
})