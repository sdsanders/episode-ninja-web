import { Component, OnInit, Inject } from '@angular/core';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { first } from 'rxjs/operators';

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
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(first())
    .subscribe(params => {
      const slug = params['slug'];

      if (slug) {
        this.ninjaService.getPodcastEpisode(slug)
        .pipe(first())
        .subscribe(episode => {
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

      this.ninjaService.getPodcast()
      .pipe(first())
      .subscribe(podcast => {
        this.meta.addTag({
          name: 'description',
          content: podcast.description
        });

        this.podcast = podcast;
      });

      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('type', 'application/rss+xml');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('title', 'The Episode Ninja Podcast');
      link.setAttribute('href', 'https://feed.podbean.com/episodeninja/feed.xml');
      this.document.head.appendChild(link);
    });
  }

  getPlayer(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
