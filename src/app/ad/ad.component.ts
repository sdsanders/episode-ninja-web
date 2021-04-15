import { isPlatformServer } from '@angular/common';
import { Component, Input, AfterViewInit, PLATFORM_ID, Inject, isDevMode } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements AfterViewInit {
  @Input() id: string;
  @Input() sizes: [[string, string]];
  @Input() format: string;
  @Input() anchor: string;
  @Input() mediaQuery: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) { return; }

    window['nitroAds'].createAd(`nitro-${this.id}`, {
      "demo": isDevMode(),
      "refreshLimit": 10,
      "refreshTime": 30,
      "renderVisibleOnly": true,
      "refreshVisibleOnly": true,
      "report": {
        "enabled": true,
        "wording": "Report Ad",
        "position": "top-right"
      },
      ...(this.sizes ? { sizes: this.sizes } : {}),
      ...(this.format ? { format: this.format } : {}),
      ...(this.anchor ? { anchor: this.anchor } : {}),
      ...(this.mediaQuery ? { mediaQuery: this.mediaQuery } : {})
    });
  }
}
