import { Component, OnInit, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { MetaService } from '../meta.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('form') form: any;
  private searchQuery: string = '';
  private items: any[] = [];

  constructor(
    private http: Http,
    public renderer: Renderer,
    public meta: MetaService
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

  ngAfterViewInit() {
    this.meta.setTitle(this.renderer, 'episode.ninja | The Best Episodes of Your Favorite Shows');
    this.meta.addTag(this.renderer, {
      name: 'description',
      content: 'The highest user rated episodes of any show'
    });
  }

  getItems(val: string) {
    this.http.get('http://episodes.stevendsanders.com/search/' + val).map(res => {
      let body = res.json();
      return body || [];
    }).subscribe(results => {
      this.items = results;
    });
  }

}
