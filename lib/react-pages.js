"use strict";

var PluginError = require("gulp-util").PluginError;

var through = require("through2");
var path = require("path");

var React = require("react");

var setTimeout = require("timers").setTimeout;

var browserSync = require("browser-sync");

var cleanModuleCache = require("./utils").cleanModuleCache;
var dirUtils = require("./utils").dirUtils;

var PLUGIN_NAME = require("../package.json").name;

exports.renderReactPages = function renderReactPages(options) {
  var stream = through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      this.emit("error", new PluginError(PLUGIN_NAME, "Streams are not supported!"));
      return callback();
    }

    if (file.isBuffer()) {
      var modulePath = path.relative(__dirname, file.path);
      var moduleExt = path.extname(modulePath);

      try {
        cleanModuleCache(modulePath);
        var Page = require(modulePath);
        var output = React.renderToStaticMarkup(
          React.createElement(Page, {
            data: file.data,
            file: file,
            paths: {
              absSiteDir: dirUtils.absSiteDir(options),
              absPagesDir: dirUtils.absPagesDir(options),
              absDataDir: dirUtils.absDataDir(options),
              relPagePath: dirUtils.relPagePath(options, file)
            }
          })
        );

        file.contents = new Buffer(output);
        file.path = file.path.replace(new RegExp(moduleExt + "$"), ".html");

        this.push(file);

        return callback();
      } catch(e) {
        console.error("ERROR RENDERING JSX PAGE: ", e.stack);
        browserSync.pause();
        browserSync.notify("ERROR RENDERING JSX PAGE: <b>" + e.toString() + "</b>", 10000);
        setTimeout(function () { browserSync.resume(); }, 10000);
        return callback();
      }
    }
  });

  return stream;
};
