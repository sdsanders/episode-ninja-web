import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() submitted = new EventEmitter();
  public query: String = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/search'], { queryParams: { query: this.query } });
    this.submitted.emit(null);
    console.log('emitting');
  }
}
