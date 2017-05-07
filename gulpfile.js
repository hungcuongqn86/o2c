var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('build', copyFunction);
gulp.task('index', copyIndex);

function copyFunction ()
{
    return gulp
        .src(['./public/dist/.*', './public/dist/*.*', '!./public/dist/index.html'])
        .pipe(gulp.dest('public'));
}

function copyIndex ()
{
    return gulp
        .src(['./public/dist/index.html'])
        .pipe(rename('index.blade.php'))
        .pipe(gulp.dest('./resources/views'));
}

gulp.task('default', ['build','index']);