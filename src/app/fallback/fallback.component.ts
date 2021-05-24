import { isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss']
})
export class FallbackComponent {
  get blocked(): boolean {
    if (isPlatformServer(this.platformId)) {
      return false;
    }

    return !window['nitroAds'].loaded;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

}
