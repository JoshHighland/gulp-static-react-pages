import gulp from "gulp";
import watch from "gulp-watch";
import prettify from "gulp-prettify";

import browserSync from "browser-sync";

const reload = browserSync.reload;

const paths = {
  pages: "./site/pages/**/*.jsx",
  dataFiles: "./site/data/**/*"
};

import renderStaticReactPages from "gulp-static-react-pages";

gulp.task("build", function() {
  return gulp.src(paths.pages)
    .pipe(renderStaticReactPages({
      baseDir: "./site"
    }))
    .pipe(prettify({indent_size: 2})) // eslint-disable-line camelcase
    .pipe(gulp.dest("./build/"))
    .pipe(reload({stream: true}));
});

gulp.task("watch", function() {
  watch(paths.pages, function() { gulp.start("render-pages"); });
  watch(paths.dataFiles, function() { gulp.start("render-pages"); });
});

gulp.task("dev", function() {
  browserSync({
    port: parseInt(process.env.http_port || "9999"),
    server: {
      baseDir: "./build"
    },
    open: false
  });
});
