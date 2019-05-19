import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-podcast-page',
  templateUrl: './podcast-page.component.html',
  styleUrls: ['./podcast-page.component.scss']
})
export class PodcastPageComponent implements OnInit {
  podcast;

  constructor(
    private meta: Meta,
    private title: Title,
    private ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.title.setTitle('Podcast | Episode Ninja');
    this.meta.addTag({
      name: 'description',
      content: 'The Episode Ninja Podcast - Coming Soon!'
    });

    this.ninjaService.getPodcast().subscribe(podcast => {
      this.podcast = podcast;
    });
  }

}
