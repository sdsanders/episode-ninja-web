import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-episode-list-page',
  templateUrl: './episode-list-page.component.html'
})
export class EpisodeListPageComponent implements OnInit {
  episodes: any[] = [];

  constructor(
    private ninjaService: NinjaService,
    public router: Router,
    private meta: Meta,
    private title: Title,
  ) { }

  ngOnInit() {
    this.ninjaService.getFinales().subscribe(episodes => {
      this.episodes = episodes;
    });

    this.title.setTitle(`The Best Series Finales of All Time | Episode Ninja`);
    this.meta.addTags([
      {
        name: 'description',
        content: 'The top 50 series finales of all time, ranked by user ratings'
      }
    ]);
  }

}
