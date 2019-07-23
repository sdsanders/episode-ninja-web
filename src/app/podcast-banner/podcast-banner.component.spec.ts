import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastBannerComponent } from './podcast-banner.component';

describe('PodcastBannerComponent', () => {
  let component: PodcastBannerComponent;
  let fixture: ComponentFixture<PodcastBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
