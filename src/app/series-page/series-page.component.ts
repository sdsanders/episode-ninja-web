import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NinjaService } from '../ninja.service';
import { AuthService } from '../auth.service';
import { SignupPromptComponent } from '../signup-prompt/signup-prompt.component';

import { SimpleModalService } from 'ngx-simple-modal';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent implements OnInit {
  series: any = {};
  images: any = [];
  worst: boolean = false;
  bestSeasons: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private meta: Meta,
    private title: Title,
    private ninjaService: NinjaService,
    private authService: AuthService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit() {
    this.route.params
    .pipe(first())
    .subscribe(params => {
      const slug = params['slug'];

      this.worst = this.router.url.includes('worst-episodes');
      this.bestSeasons = this.router.url.includes('best-seasons');
      this.getSeries(slug, this.worst, this.bestSeasons);
    });
  }

  getSeries(slug: string, worst: boolean, seasons: boolean, offset = 0) {
    const request = seasons ? this.ninjaService.getSeasons(slug) : this.ninjaService.getSeries(slug, worst, offset);

    request
    .pipe(first())
    .subscribe(series => {
      if (offset === 0) {
        this.series = series;
        this.setMeta(this.series, worst, seasons);
        return;
      }

      this.series.episodes = [...this.series.episodes, ...series.episodes];
    }, error => {
      console.log('error', error);
    });
  }

  episodeImage(episode) {
    if (episode.imageUrl) { return episode.imageUrl; }

    return `https://cdn.episode.ninja/file/episodeninja/show/${this.series.id}-thumb.jpg`;
  }

  seasonImage(season) {
    return `https://cdn.episode.ninja/file/episodeninja/season/${season.id}.jpg`;
  }

  setMeta(series, worst: boolean, seasons: boolean) {
    const description = `Every ${seasons ? 'season' : 'episode'} of ${series.seriesName} ever, ranked from ${worst ? 'worst' : 'best'} to ${worst ? 'best' : 'worst'} by thousands of votes from fans of the show. The ${worst ? 'worst' : 'best'} episodes of ${series.seriesName}!`
    const title = `The ${worst ? 'Worst' : 'Best'} ${seasons ? 'Seasons' : 'Episodes'} of ${series.seriesName}`;
    const image = `https://cdn.episode.ninja/file/episodeninja/show/${series.id}.jpg`;

    this.title.setTitle(`${worst ? 'Worst' : 'Best'} ${series.seriesName} ${seasons ? 'Seasons' : 'Episodes'} | Episode Ninja`);
    this.meta.addTags([
      {
        property: 'og:title',
        content: title
      },
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:title',
        content: title
      },
      {
        property: 'twitter:description',
        content: description
      },
      {
        property: 'twitter:image',
        content: image
      },
      {
        property: 'twitter:site',
        content: '@theepisodeninja'
      }
    ]);
  }

  onRatingClick(event) {
    console.log('click');
    event.preventDefault();
  }

  onRatingChange(rating, episode) {
    this.authService.isAuthenticated()
    .pipe(first())
    .subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.ninjaService.vote(this.series.id, episode.id, rating * 2)
        .pipe(first())
        .subscribe(({ rating: newRating, ratingCount }) => {
          episode.rating = newRating;
          episode.ratingCount = ratingCount;
        });
      } else {
        episode.ratings = [{ rating: 0 }];

        const disposable = this.simpleModalService.addModal(SignupPromptComponent)
        .subscribe(() => {
          disposable.unsubscribe();
          this.simpleModalService.removeAll();
        });
      }
    });
  }

}
