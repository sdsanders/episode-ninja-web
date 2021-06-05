import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-just-watch',
  templateUrl: './just-watch.component.html'
})
export class JustWatchComponent implements OnInit {
  @Input() imdbId: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    const src = 'https://widget.justwatch.com/justwatch_widget.js';
    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'src', src);
    this.renderer.setAttribute(script, 'async', '');
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
