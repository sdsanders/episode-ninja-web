import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MetaService } from '../meta.service';
import { NinjaService } from '../ninja.service';

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
    public renderer: Renderer,
    public meta: MetaService,
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
    this.ninjaService.getDirector(slug).subscribe(episodes => {
      this.episodes = episodes;
      this.meta.setTitle(this.renderer, `Best Episodes Directed by ${this.director} | episode.ninja`);
      this.meta.addTag(this.renderer, {
        property: 'og:title',
        content: `The Best Episodes Directed by ${this.director}`
      });
      this.meta.addTag(this.renderer, {
        name: 'description',
        content: `The highest user rated episodes directed by ${this.director}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:description',
        content: `The highest user rated episodes directed by ${this.director}`
      });
    }, error => {
      console.log('error', error);
    });
  }

}
