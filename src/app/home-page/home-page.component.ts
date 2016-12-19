import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('form') form: any;
  private searchQuery: string = '';
  private items: any[] = [];
  private popular: any[] = [];

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
    this.getPopular();

    this.form.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(form => {
        if (form.search) {
          this.getItems(form.search);
        }
      });
  }

  getItems(val: string) {
    this.http.get('http://localhost:3000/search/' + val).map(res => {
      let body = res.json();
      return body || [];
    }).subscribe(results => {
      this.items = results;
    });
  }

  getPopular() {
    this.http.get('http://localhost:3000/popular').map(res => {
      let body = res.json();
      return body || [];
    }).subscribe(shows => {
      this.popular = shows;
    });
  }

}
