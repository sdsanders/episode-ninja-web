import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NinjaService {

  constructor(
    private http: Http
  ) { }


  getAllShows() {
    return this.http.get(`${environment.apiUrl}/shows`).map(this.extractData);
  }

  getFeaturedShows() {
    return this.http.get(`${environment.apiUrl}/featured`).map(this.extractData);
  }

  getDirector(slug: string) {
    return this.http.get(`${environment.apiUrl}/director/${slug}`).map(this.extractData);
  }

  getSeries(slug: string, worst: boolean) {
    const params = worst ? `${slug}?worst=true` : slug;

    return this.http.get(`${environment.apiUrl}/episodes/${params}`)
      .map(this.extractData)
      .map(series => {
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
      });
  }

  search(searchTerm: string) {
    return this.http.get(`${environment.apiUrl}/search/${searchTerm}`).map(this.extractData);
  }

  private extractData(res) {
    let body = res.json();
    return body || [];
  }
}
