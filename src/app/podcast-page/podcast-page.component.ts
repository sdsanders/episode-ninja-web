import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast-page',
  templateUrl: './podcast-page.component.html',
  styleUrls: ['./podcast-page.component.scss']
})
export class PodcastPageComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Podcast | Episode Ninja');
    this.meta.addTag({
      name: 'description',
      content: 'The Episode Ninja Podcast - Coming Soon!'
    });
  }

}
