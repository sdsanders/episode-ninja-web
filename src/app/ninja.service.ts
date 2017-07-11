import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class NinjaService {

  constructor(
    private http: Http
  ) { }


  getAllShows() {
    return this.http.get('https://episodes.stevendsanders.com/shows').map(res => {
      let body = res.json();
      return body || [];
    });
  }
}
