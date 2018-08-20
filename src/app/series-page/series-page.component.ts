import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MetaService } from '../meta.service';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent implements OnInit {
  series: any = {};
  images: any = [];
  worst: boolean = false;
  bestSeasons: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public renderer: Renderer,
    public meta: MetaService,
    public ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.worst = this.router.url.includes('worst-episodes');
      this.bestSeasons = this.router.url.includes('best-seasons');
      this.getSeries(params['slug'], this.worst, this.bestSeasons);
    });
  }

  getSeries(slug: string, worst: boolean, seasons: boolean) {
    const request = seasons ? this.ninjaService.getSeasons(slug) : this.ninjaService.getSeries(slug, worst);
    request.subscribe(series => {
      this.series = series;
      this.setMeta(this.series, worst, seasons);
    }, error => {
      console.log('error', error);
    });
  }

  episodeImage(episode) {
    if (episode.imageUrl) { return episode.imageUrl; }
    if (episode.filename) { return `https://thetvdb.com/banners/${episode.filename}`; }

    return `https://thetvdb.com/banners/${this.series.fanart}`;
  }

  seasonImage(season) {
    return `https://cdn.episode.ninja/file/episodeninja/${season.id}.jpg`;
  }

  setMeta(series, worst: boolean, seasons: boolean) {
    const description = `A list of the 25 ${worst ? 'lowest' : 'highest'} rated ${seasons ? 'seasons' : 'episodes'} of ${series.seriesName}, ranked by thousands of ratings from fans of the series`;
    const title = `The ${worst ? 'Worst' : 'Best'} ${seasons ? 'Seasons' : 'Episodes'} of ${series.seriesName}`;
    const image = `https://cdn.episode.ninja/file/episodeninja/${series.id}.jpg`;

    this.meta.setTitle(this.renderer, `${worst ? 'Worst' : 'Best'} ${seasons ? 'Seasons' : 'Episodes'} of ${series.seriesName} | episode.ninja`);
    this.meta.addTag(this.renderer, {
      property: 'og:title',
      content: title
    });
    this.meta.addTag(this.renderer, {
      name: 'description',
      content: description
    });
    this.meta.addTag(this.renderer, {
      property: 'og:description',
      content: description
    });
    this.meta.addTag(this.renderer, {
      property: 'og:image',
      content: image
    });
    this.meta.addTag(this.renderer, {
      property: 'twitter:card',
      content: 'summary_large_image'
    });
    this.meta.addTag(this.renderer, {
      property: 'twitter:title',
      content: title
    });
    this.meta.addTag(this.renderer, {
      property: 'twitter:description',
      content: description
    });
    this.meta.addTag(this.renderer, {
      property: 'twitter:image',
      content: image
    });
    this.meta.addTag(this.renderer, {
      property: 'twitter:site',
      content: '@theepisodeninja'
    });
  }

}
