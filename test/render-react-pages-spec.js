"use strict";

var gulp = require("gulp");
var assert = require("stream-assert");
var path = require("path");

var renderReactPages = require("../lib/plugin").renderReactPages;

describe("renderReactPages gulp plugin", function () {
  it("should render 'site/pages/page.jsx'", function(done) {
    gulp.src(path.join(__dirname, "fixtures", "site", "pages", "*.jsx"))
        .pipe(renderReactPages({
          baseDir: path.join(__dirname, "fixtures", "site")
        }))
        .pipe(assert.first(function (file) {
          expect("" + file.contents).toEqual("<div>fixturecontent</div>");
        }))
        .pipe(assert.first(function () {
          done();
        }));
  });
});
