// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
const { REQUEST, RESPONSE } = require('@nguniversal/express-engine/tokens');

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { createSitemap } from 'sitemap';
import * as rp from 'request-promise-native';
import * as apicache from 'apicache';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const server = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory } = require('./dist/server/main');

const cache = apicache.middleware;
const cacheDuration = '14 days';

let sitemap;
let showList = [];

function generateSitemap() {
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

generateSitemap();

server.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      {
        provide: REQUEST,
        useValue: options.req,
      },
      {
        provide: RESPONSE,
        useValue: options.res,
      }
    ]
  }).then(html => {
    callback(null, html);
  });
});

server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'browser'));

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

server.post('/clear-cache/:slug?', (req, res) => {
  res.json(apicache.clear(`/series/${req.params.slug}`));
});

// Redirect to nitropay ads.txt file
server.get('/ads.txt', (req, res) => {
  res.redirect(301, "https://api.nitropay.com/v1/ads-729.txt");
});


// Server static files from /browser
server.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
server.get('*', cache(cacheDuration), (req, res) => {
    // If this is a series and the slug has changed
  // 301 redirect to the new slug
  let matchFound = false;
  let urlParts = req.originalUrl.split('/');

  if(urlParts[1] === 'series') {
    for (let show of showList) {
      if (!show.oldSlug) {
        continue;
      }

      if (urlParts[2] === show.oldSlug || decodeURIComponent(urlParts[2]) === show.oldSlug) {
        matchFound = true;
        res.redirect(301, `/series/${show.slug}`);
        res.end();
        break;
      }
    }
  }

  if (!matchFound) {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res });
  }
});

// Start up the Node server
server.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

export function app() {
  return server;
}
