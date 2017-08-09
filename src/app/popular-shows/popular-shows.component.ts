import { Component, OnInit, Input } from '@angular/core';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-popular-shows',
  templateUrl: './popular-shows.component.html',
  styleUrls: ['./popular-shows.component.css']
})
export class PopularShowsComponent implements OnInit {
  @Input('sidebar') sidebar: boolean;
  private popular: any[] = [];

  constructor(
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.getPopular();
  }

  getPopular() {
    this.ninjaService.getPopularShows().subscribe(shows => {
      this.popular = shows;
    });
  }
}
