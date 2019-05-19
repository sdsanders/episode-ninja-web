import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('About | Episode Ninja');
    this.meta.addTag({
      name: 'description',
      content: 'The goal of this site is to provide a list of the best episodes of any TV show'
    });
  }

}
