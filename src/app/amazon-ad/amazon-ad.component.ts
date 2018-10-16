import { Component, Input, Renderer2, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-amazon-ad',
  template: ''
})
export class AmazonAdComponent implements OnInit {
  @Input('ad') ad: string; // Load a saved ad
  @Input('products') products: any[]; // Dynamically generate an ad

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    const scriptSrc = '//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1';

    this.generateSettingsScript(this.products);

    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'src', scriptSrc);
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  generateSettingsScript(products) {
    let settingsString = 'amzn_assoc_ad_type = "banner";';
    settingsString += 'amzn_assoc_marketplace = "amazon";';
    settingsString += 'amzn_assoc_region = "US";';
    settingsString += 'amzn_assoc_placement = "assoc_banner_placement_default";';
    settingsString += 'amzn_assoc_campaigns = "amzn_firetv_1003_stick4k";';
    settingsString += 'amzn_assoc_banner_type = "category";';
    settingsString += 'amzn_assoc_isresponsive = "true";';
    settingsString += 'amzn_assoc_banner_id = "16AMVYEPTZTVP7638N02";';
    settingsString += 'amzn_assoc_tracking_id = "episodeninja-20";';
    settingsString += 'amzn_assoc_linkid = "3a0454890b796f3b4988c3a1ede9b5a8";';

    const text = this.renderer.createText(settingsString);
    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'type', 'text/javascript');
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
