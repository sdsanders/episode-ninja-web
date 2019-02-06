import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class NinjaService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }


  getAllShows() {
    return this.http.get(`${environment.apiUrl}/shows`);
  }

  getFeaturedShows() {
    return this.http.get(`${environment.apiUrl}/featured`);
  }

  getDirector(slug: string) {
    slug = encodeURIComponent(slug);
    return this.http.get(`${environment.apiUrl}/director/${slug}`)
      .pipe(catchError(this.handleError));
  }

  getSeasons(slug: string) {
    slug = encodeURIComponent(slug);

    return this.http.get(`${environment.apiUrl}/seasons/${slug}`)
  }

  getSeries(slug: string, worst: boolean) {
    slug = encodeURIComponent(slug);
    const params = worst ? `${slug}?worst=true` : slug;

    return this.http.get(`${environment.apiUrl}/episodes/${params}`)
      .pipe(map((series: any) => {
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
      }, catchError(this.handleError)));
  }

  search(searchTerm: string) {
    return this.http.get(`${environment.apiUrl}/search/${searchTerm}`);
  }

  vote(seriesId: string, episodeId: string, rating: number) {
    return this.http.post(`${environment.apiUrl}/vote`, {
      seriesId, episodeId, rating
    });
  }

  handleError(error) {
    console.log('handling error', error);
    if (error.status === 404) {
      console.log('routing');
      return this.router.navigate(['/not-found'], { skipLocationChange: true });
    }

    return throwError(error);
  }
}
