import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-prompt',
  templateUrl: './signup-prompt.component.html',
  styleUrls: ['./signup-prompt.component.scss']
})
export class SignupPromptComponent extends SimpleModalComponent<{}, null> {

  constructor(private router: Router) {
    super();
  }

  confirm(route: string): void {
    this.close();
    this.router.navigate([route]);
  }

}
