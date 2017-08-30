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
  public popularShows: any[] = [];
  public newShows: any[] = [];

  constructor(
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.getPopular();
  }

  getPopular() {
    this.ninjaService.getFeaturedShows().subscribe(({popular, recent}) => {
      this.popularShows = popular;
      this.newShows = recent;
    });
  }
}
