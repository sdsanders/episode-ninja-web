import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
      console.log('series', series);
      this.series = series;

      this.http.get('http://episodes.stevendsanders.com/series/' + this.series.id + '/images/query?keyType=fanart').map(res => {
        let body = res.json();
        return body.data || {};
      }).map(images => {
        return images.sort((a, b) => {
          return b.ratingsInfo.average - a.ratingsInfo.average;
        });
      }).subscribe(images => {
        console.log('images', images);
        this.images = images;
      });
    });
  }

}
