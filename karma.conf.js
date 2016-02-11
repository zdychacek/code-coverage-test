var path = require('path');
var globSync = require('glob').sync;

module.exports = function(config) {
  config.set({
    frameworks: [ 'browserify', 'jasmine' ],
    files: [
      'build/vendor.js',
      'build/app.js',
      'src/*.spec.js',
    ],
    reporters: [ 'progress', 'coverage' ],
    preprocessors: {
      'src/*.spec.js': [ 'browserify' ],
    },
    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-coverage'
    ],
    browsers: [ 'PhantomJS' ],
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type : 'html', dir: 'coverage/' },
      ]
    },
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browserify: {
      debug: true,
      transform: [ 'babelify' ],
      configure: function (bundler) {
        bundler.on('prebundle', function () {
          globSync('./src/**/!(*.spec).js').forEach(function (file) {
            bundler.external(file);
          });
        });
      }
    },
    singleRun: true
  });
};
