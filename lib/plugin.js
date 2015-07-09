"use strict";

var loadDataFiles = require("./data-files").loadDataFiles;
var renderReactPages = require("./react-pages").renderReactPages;
var composeStreams = require("./utils").composeStreams;

function renderStaticReactPages(options) {
  return composeStreams(loadDataFiles(options), renderReactPages(options));
}
renderStaticReactPages.loadDataFiles = loadDataFiles;
renderStaticReactPages.renderReactPages = renderReactPages;

// Exporting the plugin main function
module.exports = renderStaticReactPages;
