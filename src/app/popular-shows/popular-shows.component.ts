import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-popular-shows',
  templateUrl: './popular-shows.component.html',
  styleUrls: ['./popular-shows.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopularShowsComponent implements OnInit {
  @Input('sidebar') sidebar: boolean;
  @Input('shows') shows: any[] = [];
  public popularShows: any[] = [];
  public newShows: any[] = [];
  networks: { name: string, slug: string }[] = [];
  years: number[] = Array.from({ length: 9 }, (_, i) => new Date().getFullYear() - i);

  constructor(
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.getPopular();
  }

  getPopular() {
    this.ninjaService.getFeaturedShows().subscribe(({ popular, recent, networks }: any) => {
      this.popularShows = popular;
      this.newShows = recent;
      this.networks = networks;
    });
  }
}
