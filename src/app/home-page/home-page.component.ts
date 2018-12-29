import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('episode.ninja | The Best Episodes of Your Favorite Shows');
    this.meta.addTag({
      name: 'description',
      content: 'The best episodes of any television show chosen by millions of ratings from fans!'
    });
  }

}
