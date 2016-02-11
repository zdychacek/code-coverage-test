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

const vendors = Object.keys(require('./package.json').dependencies);

const vendorBundler = () =>
	vendors.reduce((bundler, file) =>
		bundler.require(file), browserify({}));

const appBundler = (debug) => {
	let bundler = browserify({ debug })
		.transform(
			istanbul({
				instrumenter: isparta,
				ignore: [ '**/src/*.spec.js' ]
			})
		)
		.transform(babelify);

	bundler = globSync('./src/**/!(*.spec).js')
		.reduce((bundler, file) =>
			bundler.require(file, { expose: true }), bundler)

	return vendors.reduce((bundler, file) =>
		bundler.external(file), bundler);
}

gulp.task('build:app', () => {
	return appBundler(true)
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

gulp.task('test', [ 'build:app', 'build:vendor' ], (done) => {
	new KarmaServer({ configFile: `${__dirname}/karma.conf.js` }, done).start();
});
