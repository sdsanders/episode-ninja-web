/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { existsSync } from 'fs';

import { createSitemap } from 'sitemap';
import * as rp from 'request-promise-native';
import * as apicache from 'apicache';

const cache = apicache.options({
  statusCodes: {
    include: [200]
  }
}).middleware;
const cacheDuration = '14 days';
let sitemap;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

function generateSitemap() {
  let showList = [];

  let newSitemap = createSitemap ({
    hostname: 'https://episode.ninja',
    cacheTime: 600000
  });

  newSitemap.add({url: '/'});
  newSitemap.add({url: '/shows'});
  newSitemap.add({url: '/about'});
  newSitemap.add({url: '/podcast'});
  newSitemap.add({url: '/best-tv-series-finales'});
  newSitemap.add({url: '/advertise'});

  for (let year = 1960; year <= new Date().getFullYear(); year++) {
    newSitemap.add({url: `best-shows-of-${year}`});
 }

  rp({
    uri: 'https://api.episode.ninja/shows',
    json: true
  }).then(shows => {
    showList = shows;
    shows.forEach(show => {
      newSitemap.add({url: `/series/${show.slug}`});
      if (show.totalEpisodes >= 50) {
        newSitemap.add({url: `/series/${show.slug}/worst-episodes`});
      }
      if (show.totalSeasons >= 3) {
        newSitemap.add({url: `/series/${show.slug}/best-seasons`});
      }
    });

    sitemap = newSitemap;
  });

  rp({
    uri: 'https://api.episode.ninja/podcast',
    json: true
  }).then(({ items }) => {
    items.forEach(item => {
      newSitemap.add({url: `/podcast/${item.slug}`});
    });

    sitemap = newSitemap;
  });

  rp({
    uri: 'https://api.episode.ninja/networks',
    json: true
  }).then((networks) => {
    networks.forEach(({ networkSlug }) => {
      newSitemap.add({url: `/best-${networkSlug}-shows`});
    });

    sitemap = newSitemap;
  });
}

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/episode-ninja-web/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  generateSitemap();

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/sitemap.xml', function(req, res) {
    sitemap.toXML((err, xml) => {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
    });
  });

  server.post('/clear-cache', (req, res) => {
    generateSitemap();
    res.json(apicache.clear());
  });

  server.post('/clear-cache/:slug', (req, res) => {
    res.json(apicache.clear(`/series/${req.params.slug}`));
  });

  // Redirect to nitropay ads.txt file
  server.get('/ads.txt', (req, res) => {
    res.redirect(301, "https://api.nitropay.com/v1/ads-729.txt");
  });


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', cache(cacheDuration), (req, res) => {
    res.render(indexHtml, { req, providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
      {
        provide: REQUEST,
        useValue: req,
      },
      {
        provide: RESPONSE,
        useValue: res,
      }
    ] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
