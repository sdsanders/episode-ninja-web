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
    this.http.get('http://episodes.stevendsanders.com/episodes/' + slug).map(res => {
      let body = res.json();
      return body || {};
    }).subscribe(series => {
      this.series = series;
      this.meta.setTitle(this.renderer, `Best Episodes of ${this.series.seriesName} | episode.ninja`);
      this.meta.addTag(this.renderer, 'description', `The highest user rated episodes of ${this.series.seriesName}`);
    });
  }

}
