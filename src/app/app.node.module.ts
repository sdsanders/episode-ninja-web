/**
 * This file and `main.node.ts` are identical, at the moment(!)
 * By splitting these, you're able to create logic, imports, etc that are "Platform" specific.
 * If you want your code to be completely Universal and don't need that
 * You can also just have 1 file, that is imported into both
 * client.ts and server.ts
 */

import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './index';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'series/:slug', component: SeriesPageComponent }
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
    SeriesPageComponent
  ],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * BrowserModule, HttpModule, and JsonpModule are included
     */
    UniversalModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppModule {

}
