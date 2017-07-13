import { Component, OnInit, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { MetaService } from '../meta.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor(
    public renderer: Renderer,
    public meta: MetaService
  ) {}

  ngAfterViewInit() {
    this.meta.setTitle(this.renderer, 'episode.ninja | The Best Episodes of Your Favorite Shows');
    this.meta.addTag(this.renderer, {
      name: 'description',
      content: 'The highest user rated episodes of any show'
    });
  }

}
