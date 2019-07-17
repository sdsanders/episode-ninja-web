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

  constructor(
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.getPopular();

    const $MMT = window['$MMT'] || {}; $MMT.cmd = $MMT.cmd || [];
    $MMT.cmd.push(function() {$MMT.display.slots.push(['65c6c14c-9dac-4695-ac7b-815c9c518be5']); });
    $MMT.cmd.push(function() {$MMT.display.slots.push(['33d4ee1c-3c88-4de3-8cf2-26e999ff6b9a']); });
  }

  getPopular() {
    this.ninjaService.getFeaturedShows().subscribe(({popular, recent}: any) => {
      this.popularShows = popular;
      this.newShows = recent;
    });
  }
}
