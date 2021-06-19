import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements OnInit {
  public shows: any[];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.route.queryParams
    .pipe(first())
    .subscribe(params => {
      this.getResults(params['query']);
    });
  }

  getResults(query: string) {
    this.ninjaService.search(query)
    .pipe(first())
    .subscribe((shows: any) => {
      this.shows = shows;
    });
  }
}
