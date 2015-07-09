"use strict";

var gulp = require("gulp");
var assert = require("stream-assert");
var path = require("path");

var loadDataFiles = require("../lib/plugin").loadDataFiles;

describe("loadDataFiles gulp plugin", function () {
  it("should load 'site/data/site.yaml' and 'site/data/page.yaml' on 'site/pages/page.jsx'", function(done) {
    gulp.src(path.join(__dirname, "fixtures", "site", "pages", "*.jsx"))
        .pipe(loadDataFiles({
          baseDir: path.join(__dirname, "fixtures", "site")
        }))
        .pipe(assert.first(function (file) {
          expect(file.data.site).toEqual({
            siteFixtures: true
          });

          expect(file.data.page).toEqual({
            pageFixtures: true
          });
        }))
        .pipe(assert.first(function () {
          done();
        }));
  });
});
