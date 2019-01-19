import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  { path: '**', redirectTo: 'not-found' }
];

export function ninjaServiceFactory(http, router) {
  return new NinjaService(http, router);
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
    SignupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'episode-ninja-web'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NinjaService,
      useFactory: ninjaServiceFactory,
      deps: [HttpClient, Router]
    },
    AuthService
  ]
})
export class AppModule {

}
