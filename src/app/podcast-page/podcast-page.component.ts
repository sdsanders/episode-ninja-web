import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-podcast-page',
  templateUrl: './podcast-page.component.html',
  styleUrls: ['./podcast-page.component.scss']
})
export class PodcastPageComponent implements OnInit {
  podcast;
  episode;

  constructor(
    private meta: Meta,
    private title: Title,
    private ninjaService: NinjaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];

      if (slug) {
        this.ninjaService.getPodcastEpisode(slug).subscribe(episode => {
          this.title.setTitle(`${episode.title} | The Episode Ninja Podcast`);
          this.meta.addTag({
            name: 'description',
            content: episode.contentSnippet
          });

          this.episode = episode;
        });

        return;
      }

      this.title.setTitle('The Episode Ninja Podcast | Episode Ninja');

      this.ninjaService.getPodcast().subscribe(podcast => {
        this.meta.addTag({
          name: 'description',
          content: podcast.description
        });

        this.podcast = podcast;
      });
    });
  }

}
