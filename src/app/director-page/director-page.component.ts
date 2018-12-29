import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NinjaService } from '../ninja.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-director-page',
  templateUrl: './director-page.component.html'
})
export class DirectorPageComponent implements OnInit {
  episodes = [];
  director: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
    public ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const capitalizeFirstChar = str => {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      };
      this.director = capitalizeFirstChar(params['slug'].replace(/-/g, ' '));

      this.getDirector(params['slug']);
    });
  }

  getDirector(slug: string) {
    this.ninjaService.getDirector(slug).subscribe((episodes: any) => {
      this.episodes = episodes;
      this.title.setTitle(`Best Episodes Directed by ${this.director} | episode.ninja`);
      this.meta.addTags([
        {
          property: 'og:title',
          content: `The Best Episodes Directed by ${this.director}`
        },
        {
          name: 'description',
          content: `The highest user rated episodes directed by ${this.director}`
        },
        {
          property: 'og:description',
          content: `The highest user rated episodes directed by ${this.director}`
        }
      ]);
    }, error => {
      console.log('error', error);
    });
  }

}
