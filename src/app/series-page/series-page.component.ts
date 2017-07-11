import { Component, OnInit, Renderer } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MetaService } from '../meta.service';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent implements OnInit {
  series: any = {};
  images: any = [];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    public renderer: Renderer,
    public meta: MetaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSeries(params['slug']);
    });
  }

  getSeries(slug: string) {
    this.http.get('https://episodes.stevendsanders.com/episodes/' + slug).map(res => {
      let body = res.json();
      return body || {};
    }).map(series => {
      series.episodes.map(episode => {
        let directorObjects = [];
        episode.directors.forEach(director => {
          directorObjects.push({
            name: director,
            slug: director.replace(/ /g, '-').toLowerCase()
          });
        });
        episode.directors = directorObjects;
        return episode;
      });
      return series;
    }).subscribe(series => {
      this.series = series;
      this.meta.setTitle(this.renderer, `Best Episodes of ${this.series.seriesName} | episode.ninja`);
      this.meta.addTag(this.renderer, {
        property: 'og:title',
        content: `The Best Episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        name: 'description',
        content: `The highest user rated episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:description',
        content: `The highest user rated episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:image',
        content: `https://thetvdb.com/banners/${this.series.fanart}`
      });
    }, error => {
      console.log('error', error);
    });
  }

}
