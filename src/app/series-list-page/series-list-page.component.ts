import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-series-list-page',
  templateUrl: './series-list-page.component.html'
})
export class SeriesListPageComponent implements OnInit {
  network: string;
  year
  shows: any[] = [];

  constructor(
    private ninjaService: NinjaService,
    public router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const slug = paramMap.get('slug');
      const year = paramMap.get('year');

      if (slug) {
        this.getNetworkShows(slug);
      }

      if (year) {
        this.year = year;
        this.getYearShows(year);
      }
    });
  }

  getNetworkShows(slug: string): void {
    this.ninjaService.getNetworkShows(slug).subscribe(({ network, shows }) => {
      this.network = network;
      this.shows = shows;

      this.title.setTitle(`The Best ${network} Shows | Episode Ninja`);
      this.meta.addTags([
        {
          name: 'description',
          content: `The best ${shows.length} shows on ${network}, ranked by user votes`
        }
      ]);
    });
  }

  getYearShows(year: string): void {
    this.ninjaService.getYearShows(year).subscribe(shows => {
      this.shows = shows;

      this.title.setTitle(`The Best Shows of ${year} | Episode Ninja`);
      this.meta.addTags([
        {
          name: 'description',
          content: `The best ${shows.length} shows of ${year}, ranked by user votes`
        }
      ]);
    });
  }

}
