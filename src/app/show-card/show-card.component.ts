import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html'
})
export class ShowCardComponent {
  @Input() show;
  constructor() {}
}
