import { Component, Input, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-amazon-ad',
  template: ''
})
export class AmazonAdComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  public ngOnInit() {
    const s = this.renderer.createElement('script');

    this.renderer.setAttribute(
      s,
      'src',
      '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=eff08152-9faf-4f4e-94a7-14ba379d3517'
    );

    this.renderer.appendChild(this.el.nativeElement, s);
  }
}
