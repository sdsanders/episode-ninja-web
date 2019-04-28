import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NinjaService } from '../ninja.service';
import { AuthService } from '../auth.service';
import { SignupPromptComponent } from '../signup-prompt/signup-prompt.component';

import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent implements OnInit {
  readonly products = [
    {
      'buy-url': 'http://www.jdoqocy.com/click-9040012-10676519-1519117620681?url=http%3A%2F%2Fwww.tvstoreonline.com%2Fthe-office-michael-scott-bobblehead%2F&amp;cjsku=7228',
      'image-url': 'https://www.tvstoreonline.com/product_images/v/424/31gIchHG3xL__34617__51886.jpg',
      'name': 'The Office Michael Scott Bobblehead',
      'price': '39.95'
    },
    {
      'buy-url': 'http://www.anrdoezrs.net/click-9040012-10676519-1519117620673?url=http%3A%2F%2Fwww.tvstoreonline.com%2Fdunder-mifflin-inc-paper-company-logo-t-shirt%2F&amp;cjsku=7205',
      'image-url': 'https://www.tvstoreonline.com/product_images/f/514/Black-Dunder-Mifflin-Paper-Co-Inc-Scranton-PA-The-Office-Dwight-Jim-Pam-T-Shirt__04478.jpg',
      'name': 'Dunder Mifflin INC Paper Company Logo T-shirt',
      'price': '17.95'
    }
  ];
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
    this.route.params.subscribe(params => {
      this.worst = this.router.url.includes('worst-episodes');
      this.bestSeasons = this.router.url.includes('best-seasons');
      this.getSeries(params['slug'], this.worst, this.bestSeasons);
    });
  }

  getSeries(slug: string, worst: boolean, seasons: boolean) {
    const request = seasons ? this.ninjaService.getSeasons(slug) : this.ninjaService.getSeries(slug, worst);
    request.subscribe(series => {
      this.series = series;
      this.setMeta(this.series, worst, seasons);
    }, error => {
      console.log('error', error);
    });
  }

  episodeImage(episode) {
    if (episode.imageUrl) { return episode.imageUrl; }
    if (episode.filename) { return `https://thetvdb.com/banners/${episode.filename}`; }

    return `https://thetvdb.com/banners/${this.series.fanart}`;
  }

  seasonImage(season) {
    return `https://cdn.episode.ninja/file/episodeninja/${season.id}.jpg`;
  }

  setMeta(series, worst: boolean, seasons: boolean) {
    const description = `A list of the ${worst ? 'lowest' : 'highest'} rated ${seasons ? 'seasons' : 'episodes'} of ${series.seriesName}, ranked by thousands of ratings from fans of the series`;
    const title = `The ${worst ? 'Worst' : 'Best'} ${seasons ? 'Seasons' : 'Episodes'} of ${series.seriesName}`;
    const image = `https://cdn.episode.ninja/file/episodeninja/${series.id}.jpg`;

    this.title.setTitle(`${worst ? 'Worst' : 'Best'} ${series.seriesName} ${seasons ? 'Seasons' : 'Episodes'} | episode.ninja`);
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

  onRatingChange({ rating }, episode) {
    this.authService.isAuthenticated().subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.ninjaService.vote(this.series.id, episode.id, rating * 2)
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
