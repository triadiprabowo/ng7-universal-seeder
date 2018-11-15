/**
 ** @description temporary fix for angular-cli universal issue
 ** @method XMLHttpRequest()
 ** @return global properties of XMLHttpRequest
 */
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/**
 ** @description temporary fix for angular-cli universal issue
 ** @method Buffer()
 ** @method btoa()
 ** @method atob()
 ** @return global properties of Buffer
 */
(global as any).Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
	(global as any).btoa = (str) => {
		return new Buffer(str, 'binary').toString('base64');
	};
}

if (typeof atob === 'undefined') {
	(global as any).atob = (b64Encoded) => {
		return new Buffer(b64Encoded, 'base64').toString('binary');
	};
}

/**
 ** @description import polyfills
 ** @method void
 ** @return void
 */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// import core modules
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// define xhr2
const xhr2 = require('xhr2');

// enabling production mode for angular server-side render
// fast compiling and rendering
enableProdMode();

// activate cookie for server-side rendering
xhr2.prototype._restrictedHeaders.cookie = false;

// define express application
const app = express();

// express config
// set DIST_FOLDER and PORT
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// define template of index.html
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// Leave this as require(), dynamically built from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// import universal engine for express framework
// import { ngExpressEngine } from '@nguniversal/express-engine';

// import module map to activate lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// express template engine
// using *.html
// render from ngExpressEngine()
// app.engine('html', ngExpressEngine({
// 	bootstrap: AppServerModuleNgFactory,
// 	providers: [
// 		provideModuleMap(LAZY_MODULE_MAP)
// 	]
// }));

/**
 ** @description HTML Engine
 ** @method renderModuleFactory()
 ** @return html string
 */
app.engine('html', (_, options, callback) => {
	renderModuleFactory(AppServerModuleNgFactory, {
		// Our index.html
		document: template,
		url: options.req.url,
		// DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
		extraProviders: [
			provideModuleMap(LAZY_MODULE_MAP),
			{ provide: 'srvRequest', useFactory: () => options.req, deps: [] }
		]
	}).then(html => {
		callback(null, html);
	});
});

// express application engine
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// express application middleware
// activate body-parser for request from x-www-form-urlencoded or json
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

// activate cookies
app.use(cookieParser());

// activate gzip
app.use(compression({level: 9}));

/*
** CORS Origins settings
** @return next()
*/
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Max-Age', '3600');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	return next();
});

// app.get([
// 	'*.js'
// ], (req, res, next) => {
// 	req.url = `${req.url}.gz`;
// 	res.set('Content-Encoding', 'gzip');
// 	res.set('Content-Type', 'text/javascript');

// 	next();
// });

// serve static file from 'dist/browser'
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
	maxAge: '1y'
}));

// serve static file for /assets
app.use('/assets', express.static(__dirname + '/dist/browser/assets', {
	index: false,
	maxAge: '1y'
}));

// render index page
// all request from universal
app.get('*', (req, res) => {
	res.render('index', { req, res });
});

// startup express
// node.js process
app.listen(PORT, () => {
	console.log(`[START.OK]: Starting server on localhost at port ${PORT} / ${new Date()}`);
});
