import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NinjaService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getAllShows() {
    return this.http.get(`${environment.apiUrl}/shows`);
  }

  getFeaturedShows() {
    return this.http.get(`${environment.apiUrl}/featured`);
  }

  getDirector(slug: string) {
    return this.http.get(`${environment.apiUrl}/director/${slug}`)
      .catch(this.handleError);
  }

  getSeries(slug: string, worst: boolean) {
    const params = worst ? `${slug}?worst=true` : slug;

    return this.http.get(`${environment.apiUrl}/episodes/${params}`)
      .map((series: any) => {
        series.episodes.map(episode => {
          let directorObjects = [];
          episode.directors.forEach(director => {
            directorObjects.push({
              name: director,
              slug: director.replace(/ /g, '-').toLowerCase()
            });
          });
          episode.directors = directorObjects;
          return episode;
        });
        return series;
      })
      .catch(err => this.handleError(err));
  }

  search(searchTerm: string) {
    return this.http.get(`${environment.apiUrl}/search/${searchTerm}`);
  }

  handleError(error) {
    console.log('handling error', error);
    if (error.status === 404) {
      console.log('routing');
      return this.router.navigate(['/not-found'], { skipLocationChange: true });
    }
    return Observable.throw(error);
  }
}
