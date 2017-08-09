import { Component, OnInit, Renderer } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MetaService } from '../meta.service';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.css']
})
export class SeriesPageComponent implements OnInit {
  series: any = {};
  images: any = [];
  worst: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public renderer: Renderer,
    public meta: MetaService,
    public ninjaService: NinjaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.worst = this.router.url.includes('worst-episodes');
      this.getSeries(params['slug'], this.worst);
    });
  }

  getSeries(slug: string, worst: boolean) {
    this.ninjaService.getSeries(slug, worst).subscribe(series => {
      this.series = series;
      this.meta.setTitle(this.renderer, `${worst ? 'Worst' : 'Best'} Episodes of ${this.series.seriesName} | episode.ninja`);
      this.meta.addTag(this.renderer, {
        property: 'og:title',
        content: `The ${worst ? 'Worst' : 'Best'} Episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        name: 'description',
        content: `The ${worst ? 'lowest' : 'highest'} user rated episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:description',
        content: `The ${worst ? 'lowest' : 'highest'} user rated episodes of ${this.series.seriesName}`
      });
      this.meta.addTag(this.renderer, {
        property: 'og:image',
        content: `https://thetvdb.com/banners/${this.series.fanart}`
      });
    }, error => {
      console.log('error', error);
    });
  }

}
