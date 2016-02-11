import path from 'path';
import gulp from 'gulp';
import browserify from 'browserify';
import istanbul from 'browserify-istanbul';
import babelify from 'babelify';
import * as isparta from 'isparta';
import { Server as KarmaServer } from 'karma';
import vss from 'vinyl-source-stream';
import { sync as globSync} from 'glob';

process.env.NODE_PATH = path.join(path.resolve('.'), 'src');

function vendorBundler () {
	const bundler = browserify({})
		.require('moment');

	return bundler;
}

function appBundler () {
	const bundler = browserify({ debug: true })
		.transform(
			istanbul({
				instrumenter: isparta,
				ignore: [ '**/src/*.spec.js' ]
			})
		)
		.transform(babelify, { presets: [ 'es2015' ] })
		.external('moment')
		//.require('./src/app.js', { entry: true });

	return globSync('./src/**/!(*.spec).js')
		.reduce((bundler, file) => bundler.require(file, { expose: true }), bundler);
}

gulp.task('build:app', () => {
	return appBundler()
		.bundle()
		.pipe(vss('app.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build:vendor', () => {
	return vendorBundler()
		.bundle()
		.pipe(vss('vendor.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('build', [ 'build:app', 'build:vendor' ]);

gulp.task('test', (done) => {
	new KarmaServer({ configFile: `${__dirname}/karma.conf.js` }, done).start();
});
