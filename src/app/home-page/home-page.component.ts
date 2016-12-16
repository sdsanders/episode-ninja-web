import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private searchQuery: string = '';
  private items: any[];

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let params = new URLSearchParams();
      params.set('name', val);
      this.http.get('http://localhost:3000/search/series', { search: params }).map(res => {
        let body = res.json();
        return body.data || { };
      }).subscribe(results => {
        this.items = results;
      })
    }
  }

}
