import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ad',
  template: ''
})
export class AdComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script');
    const src = '//native.propellerads.com/1?z=1981755&eid=';

    this.renderer.setAttribute(script, 'async', 'async');
    this.renderer.setAttribute(script, 'data-cfasync', 'false');
    this.renderer.setAttribute(script, 'src', src);
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
