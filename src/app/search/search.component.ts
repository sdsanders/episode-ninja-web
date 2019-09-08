import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Output() submitted = new EventEmitter();
  public query = '';

  constructor() {}

  onSubmit() {
    window.location.href = `/search?query="${encodeURIComponent(this.query)}`;
    this.submitted.emit(null);
  }
}
