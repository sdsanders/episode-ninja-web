import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-popular-shows',
  templateUrl: './popular-shows.component.html',
  styleUrls: ['./popular-shows.component.css']
})
export class PopularShowsComponent implements OnInit {
  @Input('sidebar') sidebar: boolean;
  private popular: any[] = [];

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.getPopular();
  }

  getPopular() {
    this.http.get('http://episodes.stevendsanders.com/popular').map(res => {
      let body = res.json();
      return body || [];
    }).subscribe(shows => {
      this.popular = shows;
    });
  }
}
