const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");


function html(next) {
   gulp.src("./src/html/templates/*.ejs")
   .pipe(ejs())
   .pipe(rename(function(path) { path.extname = ".html" }))
   .pipe(gulp.dest("./dist/"));
   next();
}
function images(next) {
   gulp.src("./src/img/*")
       .pipe(imagemin())
       .pipe(gulp.dest("./dist/assets/img/"))
       .pipe(connect.reload());
   next();
}
function scss(next) {
   gulp.src("./src/css/**/*.scss")
       .pipe(sass())
       .pipe(gulp.dest("./dist/assets/css"))
       .pipe(connect.reload());
   next();
}
function js(next) {
   gulp.src("./src/js/**/*.js")
       .pipe(babel({
           presets: ['@babel/env']
       }))
       .pipe(gulp.dest("./dist/assets/js"))
       .pipe(connect.reload());
   next();
}
function json(next) {
   gulp.src("./src/json/*.json")
       .pipe(gulp.dest("./dist/data"))
       .pipe(connect.reload());
   next();
}
// Watchers
function watchHtml() {
   gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}
function watchImages() {
   gulp.watch("./src/img/*", { ignoreInitial: false }, images);
}
function watchScss() {
   gulp.watch("./src/css/**/*.scss", { ignoreInitial: false }, scss);
}
function watchJs() {
   gulp.watch("./src/js/**/*.js", { ignoreInitial: false }, js);
}
function watchJson() {
   gulp.watch("./src/json/*.json", { ignoreInitial: false }, json);
}

gulp.task("dev", function(next) {
   watchHtml();
   watchImages();
   watchScss();
   watchJs();
   watchJson();
   connect.server({
       livereload: true,
       root: "dist"
   });
   next();
});