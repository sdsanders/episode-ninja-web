import { Component, OnInit } from '@angular/core';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-shows-page',
  templateUrl: './shows-page.component.html',
  styleUrls: ['./shows-page.component.scss']
})
export class ShowsPageComponent implements OnInit {
  shows = [];

  constructor(
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.ninjaService.getAllShows().subscribe(shows => {
      this.shows = shows;
    });
  }

}
