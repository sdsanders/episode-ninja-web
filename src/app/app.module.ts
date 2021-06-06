import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { SimpleModalModule } from 'ngx-simple-modal';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { ShowsPageComponent } from './shows-page/shows-page.component';
import { DirectorPageComponent } from './director-page/director-page.component';
import { PopularShowsComponent } from './popular-shows/popular-shows.component';
import { SearchComponent } from './search/search.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { AmazonAdComponent } from './amazon-ad/amazon-ad.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AdComponent } from './ad/ad.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { NinjaService } from './ninja.service';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { SignupPromptComponent } from './signup-prompt/signup-prompt.component';
import { PodcastPageComponent } from './podcast-page/podcast-page.component';
import { PodcastBannerComponent } from './podcast-banner/podcast-banner.component';
import { EpisodeListPageComponent } from './episode-list-page/episode-list-page.component';
import { SeriesListPageComponent } from './series-list-page/series-list-page.component';
import { AdvertisePageComponent } from './advertise-page/advertise-page.component';
import { JustWatchComponent } from './just-watch/just-watch.component';

export function networkPageMatcher(url: UrlSegment[]) {
  if (url.length !== 1) {
    return null;
  }

  const path = url[0].path;
  if (path.startsWith('best-') && path.endsWith('-shows')) {
    const networkSlug = path.replace('best-', '').replace('-shows', '');
    return {
      consumed: url,
      posParams: {
        slug: new UrlSegment(networkSlug, {})
      }
    };
  }

  return null;
}

export function showYearMatcher(url: UrlSegment[]) {
  const path = url[0].path;

  if (url.length !== 1 || !path.startsWith('best-shows-of-')) {
    return null;
  }

  const year = path.replace('best-shows-of-', '');
  return {
    consumed: url,
    posParams: {
      year: new UrlSegment(year, {})
    }
  };
}

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'series/:slug', component: SeriesPageComponent },
  { path: 'series/:slug/worst-episodes', component: SeriesPageComponent },
  { path: 'series/:slug/best-seasons', component: SeriesPageComponent },
  { path: 'shows', component: ShowsPageComponent },
  { path: 'director/:slug', component: DirectorPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'podcast', component: PodcastPageComponent },
  { path: 'podcast/:slug', component: PodcastPageComponent },
  { path: 'best-tv-series-finales', component: EpisodeListPageComponent },
  { matcher: networkPageMatcher, component: SeriesListPageComponent },
  { matcher: showYearMatcher, component: SeriesListPageComponent },
  { path: 'advertise', component: AdvertisePageComponent },
  { path: '**', redirectTo: 'not-found' }
];

export function ninjaServiceFactory(http, router, authService) {
  return new NinjaService(http, router, authService);
}

/**
 * Top-level NgModule "container"
 */
@NgModule({
  /** Root App Component */
  bootstrap: [ AppComponent ],
  /** Our Components */
  declarations: [
    AppComponent,
    HomePageComponent,
    SeriesPageComponent,
    ShowsPageComponent,
    DirectorPageComponent,
    PopularShowsComponent,
    SearchComponent,
    AboutPageComponent,
    ShowCardComponent,
    SearchPageComponent,
    NotFoundPageComponent,
    AdComponent,
    AmazonAdComponent,
    LoginComponent,
    SignupComponent,
    SignupPromptComponent,
    PodcastPageComponent,
    PodcastBannerComponent,
    EpisodeListPageComponent,
    SeriesListPageComponent,
    AdvertisePageComponent,
    JustWatchComponent
  ],
  entryComponents: [
    SignupPromptComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'episode-ninja-web'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SimpleModalModule,
    TransferHttpCacheModule,
  ],
  providers: [
    {
      provide: NinjaService,
      useFactory: ninjaServiceFactory,
      deps: [HttpClient, Router, AuthService, DomSanitizer]
    },
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {

}
