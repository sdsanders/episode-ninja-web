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
    console.log(this.products);
    let scriptSrc = '//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US';

    if (this.products && (this.products.length === 4 || this.products.length === 8)) {
      this.generateSettingsScript(this.products);
    } else {
      scriptSrc += `&adInstanceId=${this.ad}`;
    }

    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'src', scriptSrc);
    this.renderer.appendChild(this.el.nativeElement, script);
  }

  generateSettingsScript(products) {
    let settingsString = 'amzn_assoc_placement = "adunit0";';
    settingsString += 'amzn_assoc_search_bar = "false";';
    settingsString += 'amzn_assoc_tracking_id = "episodeninja-20";';
    settingsString += 'amzn_assoc_ad_mode = "manual";';
    settingsString += 'amzn_assoc_ad_type = "smart";';
    settingsString += 'amzn_assoc_marketplace = "amazon";';
    settingsString += 'amzn_assoc_region = "US";';
    settingsString += 'amzn_assoc_title = "Related Products";';
    settingsString += 'amzn_assoc_linkid = "556dab7ae7c1954c4023d7aaff7faa9c";';
    settingsString += `amzn_assoc_asins = "${products.toString()}";`;

    const text = this.renderer.createText(settingsString);
    const script = this.renderer.createElement('script');

    this.renderer.setAttribute(script, 'type', 'text/javascript');
    this.renderer.appendChild(script, text);
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
