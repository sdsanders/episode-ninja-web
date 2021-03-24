import { isPlatformServer } from '@angular/common';
import { Component, Input, AfterViewInit, PLATFORM_ID, Inject, isDevMode } from '@angular/core';

@Component({
  selector: 'app-ad',
  template: '<div [id]="\'nitro-\' + id" *ngIf="id"></div>',
  styles: [':host { display: block; padding-top: 20px; }']
})
export class AdComponent implements AfterViewInit {
  @Input() id: string;
  @Input() sizes: [[string, string]];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) { return; }

    // Mobile ad config
    // window['nitroAds'].createAd('mobile', {
    //  "refreshLimit": 10,
    //  "refreshTime": 90,
    //  "format": "anchor",
    //  "anchor": "bottom",
    //  "report": {
    //    "enabled": true,
    //    "wording": "Report Ad",
    //    "position": "top-right"
    //  },
    //  "mediaQuery": "(min-width: 320px) and (max-width: 767px)"
    // });

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
      ...(this.sizes ? { sizes: this.sizes } : {})
    });
  }
}
