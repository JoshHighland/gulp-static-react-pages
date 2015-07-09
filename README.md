![status](https://secure.travis-ci.org/rpl/gulp-static-react-pages.svg?branch=master)

# gulp-static-react-pages

## Information

<table>
<tr>
<td>Package</td><td>gulp-static-react-pages</td>
</tr>
<tr>
<td>Description</td>
<td>Generate static html files from React components and data files</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.11</td>
</tr>
</table>

### Static Websites like in 2015 :-)

This simple gulp plugin helps to build your own static website generator using modern
web technologies:

- **gulp** as build process orchestrator
- **browser-sync** as development/preview webserver with auto-reload capabilities
- **React** as the its template engine (which helps to refactor your page templates
  into reusable React components)
- **yaml/json** data files as optional data available to the React page components
- **local node modules** in the website projects as reusable abstractions
- **any npm package** as third part libs directory
- **any gulp plugin** to customize your build process

## Usage

```js
var prettify = require("gulp-prettify");
var renderStaticReactPages = require("gulp-static-react-pages");

gulp.task("build", function() {
  return gulp.src("./site/pages/**/*.jsx")
    .pipe(renderStaticReactPages())
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest("./build/"));
});

```

This will render the React components from the pages files and it will pass to the components a ```data``` props with a ```site``` and a ```page``` properties.

The site data file will be loaded from (in the following order):
- ./site/data/site.yaml
- ./site/data/site.json

The page data will be loaded from (in the following order):
- ./site/data/PAGE_PATH/PAGE_BASENAME.yaml
- ./site/data/PAGE_PATH/PAGE_BASENAME.json

## Examples

Please take a look to the ```examples/simple``` for a simple website example.

## CHANGELOG

- 0.1.0 - initial release

## LICENSE

(MIT License)

Copyright (c) 2014 Luca Greco <luca.greco@alcacoop.it>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
