import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './index';
import { HomePageComponent } from './home-page/home-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { ShowsPageComponent } from './shows-page/shows-page.component';
import { DirectorPageComponent } from './director-page/director-page.component';

import { NinjaService } from './ninja.service';
import { MetaService } from './meta.service';
import { PopularShowsComponent } from './popular-shows/popular-shows.component';
import { SearchComponent } from './search/search.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ShowCardComponent } from './show-card/show-card.component';
import { SearchPageComponent } from './search-page/search-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'series/:slug', component: SeriesPageComponent },
  { path: 'series/:slug/worst-episodes', component: SeriesPageComponent },
  { path: 'shows', component: ShowsPageComponent },
  { path: 'director/:slug', component: DirectorPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'search', component: SearchPageComponent }
];

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
    SearchPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'episode-ninja-web'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NinjaService,
    MetaService
  ]
})
export class AppModule {

}
