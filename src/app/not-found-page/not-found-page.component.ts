import { Component, OnInit } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Injector } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private injector: Injector) {
    const res = this.injector.get(RESPONSE);

    res.status(404);
  }

  ngOnInit() {
  }

}
