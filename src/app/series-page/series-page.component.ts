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
  worst: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    public renderer: Renderer,
    public meta: MetaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.worst = this.router.url.includes('worst-episodes');
      this.getSeries(params['slug'], this.worst);
    });
  }

  getSeries(slug: string, worst: boolean) {
    const params = worst ? `${slug}?worst=true` : slug;
    this.http.get(`https://episodes.stevendsanders.com/episodes/${params}`).map(res => {
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
      this.meta.setTitle(this.renderer, `${worst ? 'Worst' : 'Best'} Episodes of ${this.series.seriesName} | episode.ninja`);
      this.meta.addTag(this.renderer, {
        property: 'og:title',
        content: `The ${worst ? 'Worst' : 'Best'} Episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        name: 'description',
        content: `The ${worst ? 'lowest' : 'highest'} user rated episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:description',
        content: `The ${worst ? 'lowest' : 'highest'} user rated episodes of ${this.series.seriesName}`
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
