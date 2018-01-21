import { Component, AfterViewInit, Renderer } from '@angular/core';
import { MetaService } from '../meta.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements AfterViewInit {

  constructor(
    public renderer: Renderer,
    public meta: MetaService
  ) {}

  ngAfterViewInit() {
    this.meta.setTitle(this.renderer, 'episode.ninja | The Best Episodes of Your Favorite Shows');
    this.meta.addTag(this.renderer, {
      name: 'description',
      content: 'The best episodes of any television show chosen by millions of ratings from fans!'
    });
  }

}
