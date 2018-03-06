import { Component, Input, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-media-net-ad',
  template: ''
})
export class MediaNetAdComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.generateSettingsScript();

    const script = this.renderer.createElement('script');
    const scriptSrc = '//contextual.media.net/nmedianet.js?cid=8CUB141T4';

    this.renderer.setAttribute(script, 'src', scriptSrc);
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  generateSettingsScript() {
    let settingsString = 'medianet_width = "300";';
    settingsString += 'medianet_height = "250";';
    settingsString += 'medianet_crid = "374940282";';
    settingsString += 'medianet_versionId = "3111299";';

    const text = this.renderer.createText(settingsString);
    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'language', 'javascript');
    this.renderer.setAttribute(script, 'id', 'mNCC');
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
