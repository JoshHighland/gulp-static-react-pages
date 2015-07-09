"use strict";

var through = require("through2");

var PluginError = require("gulp-util").PluginError;

var _ = require("lodash");
var yaml = require("js-yaml");
var stripComments = require("strip-json-comments");

var fs = require("fs");
var Promise = require("bluebird");

var pfs = Promise.promisifyAll(fs);

var PLUGIN_NAME = require("../package.json").name;

var dirUtils = require("./utils").dirUtils;

function loadDataFile(targetFile, dataFilePath, type) {
  return new Promise(function (resolve, reject) {
    switch(type) {
    case "yaml":
      pfs.readFileAsync(dataFilePath).then(function (rawData) {
        var yamlData = yaml.safeLoad(rawData.toString());
        resolve(_.merge({}, yamlData));
      }).catch(reject);
      break;
    case "json":
      pfs.readFileAsync(dataFilePath).then(function (rawData) {
        var jsonData = JSON.parse(stripComments(rawData.toString()));
        resolve(_.merge({}, jsonData));
      }).catch(reject);
      break;
    }
  });
}

function loadSiteData(file, options) {
  return Promise.any([
    loadDataFile(file, dirUtils.absSiteData(options, "yaml"), "yaml"),
    loadDataFile(file, dirUtils.absSiteData(options, "json"), "json")
  ]).catch(function (err) {
    if (process.env.VERBOSE) {
      console.warn(PLUGIN_NAME, "-", "Error loading site data:", err);
    }
    return {};
  });
}

function loadPageData(file, options) {
  return Promise.any([
    loadDataFile(file, dirUtils.absPageData(options, file, "yaml"), "yaml"),
    loadDataFile(file, dirUtils.absPageData(options, file, "json"), "json")
  ]).catch(function (err) {
    if (process.env.VERBOSE) {
      console.warn(PLUGIN_NAME, "-", "Error loading page data", file.path, err);
    }
    return {};
  });
}

exports.loadDataFiles = function loadDataFiles(options) {
  options = options || {};

  var stream = through.obj(function (file, enc, callback) {
    var self = this;

    if (file.isStream()) {
      self.emit("error", new PluginError(PLUGIN_NAME, "Streams are not supported!"));
      return callback();
    }

    if (file.isBuffer()) {
      Promise.props({
        site: loadSiteData(file, options),
        page: loadPageData(file, options)
      }).then(function(result) {
        file.data = result;
        self.push(file);
        callback();
      }).catch(function (err) {
        self.emit("error", new PluginError(PLUGIN_NAME, err));
        callback();
      });
    }
  });

  return stream;
};
