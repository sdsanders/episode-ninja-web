import { Component, OnInit, Input } from '@angular/core';

import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-podcast-banner',
  templateUrl: './podcast-banner.component.html',
  styleUrls: ['./podcast-banner.component.scss']
})
export class PodcastBannerComponent implements OnInit {
  episode;

  constructor(private ninjaService: NinjaService) {}

  ngOnInit() {
    this.ninjaService.getPodcast().subscribe(podcast => {
      this.episode = podcast.items[0];
    });
  }
}
