import path from 'path';
import { sync as globSync} from 'glob';

module.exports = (config) => {
	config.set({
		frameworks: [ 'browserify', 'jasmine' ],
		files: [
			'build/vendor.js',
			'build/app.js',
			'src/*.spec.js',
		],
		preprocessors: {
			'src/*.spec.js': [ 'browserify' ],
		},
		reporters: [ 'progress', 'coverage' ],
		browsers: [ 'PhantomJS' ],
		coverageReporter: {
			reporters: [
				{ type: 'text' },
				{ type : 'html', dir: 'coverage/' },
			]
		},
		browserify: {
			debug: true,
			transform: [ 'babelify' ],
			configure (bundler) {
				bundler.on('prebundle', () => {
					globSync('./src/**/!(*.spec).js').reduce((bundler, file) => bundler.external(file), bundler);
				});
			}
		},
		logLevel: config.LOG_INFO,
		autoWatch: false,
		singleRun: true
	});
};
