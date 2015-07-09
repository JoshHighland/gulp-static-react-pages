"use strict";

exports.cleanModuleCache = function cleanModuleCache(modulePath) {
  var module = require.cache[require.resolve(modulePath)];
  if (module) {
    module.children.forEach(function (children) {
      try {
        cleanModuleCache(children.filename);
      } catch(e) {} // eslint-disable-line no-empty
    });
    delete require.cache[require.resolve(modulePath)];
  }
};

var path = require("path");

var DEFAULT_SITE_DIR = "site";
var DEFAULT_DATA_DIR = "data";
var DEFAULT_PAGES_DIR = "pages";

exports.dirUtils = {
  absSiteDir: function absSiteDir(options) {
    var baseDir = options.baseDir;

    if (baseDir) {
      if (!path.isAbsolute(baseDir)) {
        return path.join(process.cwd(), baseDir);
      }

      return baseDir;
    }

    return path.join(process.cwd(), DEFAULT_SITE_DIR);
  },
  absDataDir: function absDataDir(options) {
    var siteDir = this.absSiteDir(options);
    return path.join(siteDir, options.dataDir || DEFAULT_DATA_DIR);
  },
  absPagesDir: function absPagesDir(options) {
    var siteDir = this.absSiteDir(options);
    return path.join(siteDir, options.pagesDir || DEFAULT_PAGES_DIR);
  },
  absSiteData: function absSiteData(options, extname) {
    var dataDir = this.absDataDir(options);
    return path.join(dataDir, "site." + extname);
  },

  relPagePath: function relPagePath(options, file) {
    var absPagesDir = this.absPagesDir(options);

    if (file.path.indexOf(absPagesDir)) {
      throw Error("page file path should be contained in the configured site pages dir: " +
        [
          path.relative(process.cwd(), file.path),
          path.relative(process.cwd(), absPagesDir)
        ].join(" is not in "));
    }
    return path.relative(absPagesDir, file.path);
  },

  relPageData: function relPageData(options, file, extname) {
    var relPagePath = this.relPagePath(options, file);
    return relPagePath.replace(
      path.extname(relPagePath), "." + extname
    );
  },
  absPageData: function absPageData(options, file, extname) {
    var relPageData = this.relPageData(options, file, extname);
    var dataDirPath = this.absDataDir(options);
    return path.join(dataDirPath, relPageData);
  }
};

// from http://stackoverflow.com/questions/23520232/compose-two-transform-streams-in-node-js
exports.composeStreams = function composeStreams(s1, s2) {
    s1.pipe(s2);
    s1.pipe = function (dest) {
        return s2.pipe(dest);
    };
    s1.unpipe = function (dest) {
        return s2.unpipe(dest);
    };
    return s1;
};
