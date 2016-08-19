var gulp=require('gulp');
var md5=require('gulp-md5-plus');
var uglify=require('gulp-uglify');
var cleans=require('gulp-clean');
var jade=require('gulp-jade');
var rev = require('gulp-rev');
var sass = require('gulp-ruby-sass');
var revCollector = require('gulp-rev-collector');

gulp.task('clean',function(){
  gulp.src('./dist').
    pipe(cleans());
})
gulp.task('miniHtml', function () {
  gulp.src('../bi/image/*.*').
      pipe(gulp.dest('./dist/bi/image'));
  gulp.src(['./dist/rev/**/*.json', './dist/bi/**/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('./dist/bi'));
});
gulp.task('product',['clean'], function(){
    gulp.src(['../bi/**/*.html','!../bi/calendar.html']).
      pipe(gulp.dest('./dist/bi'));
    sass('./scss/**/*.scss',{style: 'compressed'}).
        pipe(rev()).
        pipe(gulp.dest('./dist/bi/css')).
        pipe(rev.manifest()).
        pipe(gulp.dest('./dist/rev/css'));
    gulp.src('./build/**/*.js').
        pipe(rev()).
        pipe(gulp.dest('./dist/bi/build')).
        pipe(rev.manifest()).
        pipe(gulp.dest('./dist/rev/js'));
});

// gulp.task('clean',function(){
//   gulp.src(['./css/**/*.*','./rev/**/*.*','./build/**/*.*']).
//     pipe(cleans());
//   gulp.src(['./build/**/*.js','!./build/**/*-*.js']).
//     pipe(cleans());
//     gulp.src('./build/**/*.map').
//       pipe(cleans());
// })
// gulp.task('miniHtml',['product'], function () {
//   return gulp.src(['./rev/**/*.json', '../bi/**/*.html'])
//     .pipe(revCollector({
//      replaceReved: true
//     }))
//     .pipe(gulp.dest('../bi'));
// });

// gulp.task('product', function(){
//     sass('./scss/**/*.scss',{style: 'compressed'}).
//         pipe(rev()).
//         pipe(gulp.dest('./css')).
//         pipe(rev.manifest()).
//         pipe(gulp.dest('../bi/rev/css'));
//     gulp.src('./build/**/*.js').
//         pipe(rev()).
//         pipe(gulp.dest('./build')).
//         pipe(rev.manifest()).
//         pipe(gulp.dest('../bi/rev/js'));
// });
