import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { StarRatingModule } from 'angular-star-rating';
import { SimpleModalModule } from 'ngx-simple-modal';
import { AdsenseModule } from 'ng2-adsense';

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
    PodcastBannerComponent
  ],
  entryComponents: [
    SignupPromptComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'episode-ninja-web'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
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
