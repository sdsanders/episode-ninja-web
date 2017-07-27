/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import './__2.1.1.workaround.ts'; // temporary until 2.1.1 things are patched in Core
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import { createEngine } from 'angular2-express-engine';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.node.module';
import { environment } from './environments/environment';
import { routes } from './server.routes';

const sm = require('sitemap');
const rp = require('request-promise-native');
const apicache = require('apicache');

// App

const app  = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const port = process.env.PORT || 4200;
const cache = apicache.middleware;
const cacheDuration = '14 days';

/**
 * enable prod mode for production environments
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Sitemap
 */
let sitemap = sm.createSitemap ({
  hostname: 'https://episode.ninja',
  cacheTime: 600000
});

sitemap.add({url: '/'});
sitemap.add({url: '/shows'});

rp({
  uri: 'https://episodes.stevendsanders.com/shows',
  json: true
}).then(shows => {
  shows.forEach(show => {
    let slug = show.seriesName.replace(/ /g, '-').toLowerCase();
    sitemap.add({url: `/series/${slug}`});
  })
});

/**
 * Express View
 */
app.engine('.html', createEngine({}));
app.set('views', path.join(ROOT, 'client'));
app.set('view engine', 'html');

/**
 * Enable compression
 */
app.use(compression());

/**
 * serve static files
 */
app.use('/', express.static(path.join(ROOT, 'client'), {index: false}));

/**
 * place your api routes here
 */
// app.use('/api', api);

/**
 * bootstrap universal app
 * @param req
 * @param res
 */
function ngApp(req: any, res: any) {
  res.render('index', {
    req,
    res,
    ngModule: AppModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname
  });
}

/**
 * use universal for specific routes
 */
app.get('/', cache(cacheDuration), ngApp);
routes.forEach(route => {
  app.get(`/${route}`, cache(cacheDuration), ngApp);
  app.get(`/${route}/*`, cache(cacheDuration), ngApp);
});

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send( xml );
  });
});

/**
 * if you want to use universal for all routes, you can use the '*' wildcard
 */

app.get('*', function (req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  const pojo = {status: 404, message: 'No Content'};
  const json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
