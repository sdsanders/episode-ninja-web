import { Component, Input, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-amazon-ad',
  template: ''
})
export class AmazonAdComponent implements OnInit {
  @Input('ad') ad: string;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  public ngOnInit() {
    console.log(this.ad);
    const s = this.renderer.createElement('script');

    this.renderer.setAttribute(
      s,
      'src',
      `//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=${this.ad}`
    );

    this.renderer.appendChild(this.el.nativeElement, s);
  }
}
