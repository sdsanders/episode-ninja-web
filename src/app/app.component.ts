import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('fadeAnimation', [
      transition( '* => *', [
        query(':enter',
          [
            style({ opacity: 0 })
          ],
          { optional: true }
        ),
        query(':leave',
          [
            style({ opacity: 1 }),
            animate('0.2s', style({ opacity: 0 }))
          ],
          { optional: true }
        ),
        query(':enter',
          [
            style({ opacity: 0 }),
            animate('0.2s', style({ opacity: 1 }))
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
  showSearch = false;

  constructor(
    public router: Router
  ) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
