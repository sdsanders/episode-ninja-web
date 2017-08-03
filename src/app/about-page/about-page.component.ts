import { Component, AfterViewInit, Renderer } from '@angular/core';
import { MetaService } from '../meta.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent {

  constructor(
    public renderer: Renderer,
    public meta: MetaService
  ) {}

  ngAfterViewInit() {
    this.meta.setTitle(this.renderer, 'About | episode.ninja');
    this.meta.addTag(this.renderer, {
      name: 'description',
      content: 'The goal of this site is to provide a list of the best episodes of any TV show'
    });
  }

}
