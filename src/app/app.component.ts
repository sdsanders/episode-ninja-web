import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentYear = new Date().getFullYear();

  constructor(
    public router: Router
  ) {}
}
