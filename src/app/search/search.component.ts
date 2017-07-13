import { Component, OnInit, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @ViewChild('form') form: any;
  public searchQuery: string = '';
  public items: any[] = [];

  constructor(
    private http: Http
  ) {}

  ngOnInit() {
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
    this.http.get('https://episodes.stevendsanders.com/search/' + val).map(res => {
      let body = res.json();
      return body || [];
    }).subscribe(results => {
      this.items = results;
    });
  }

}
