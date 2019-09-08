import { Component, OnInit } from '@angular/core';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-finales-page',
  templateUrl: './finales-page.component.html'
})
export class FinalesPageComponent implements OnInit {
  finales: any[];

  constructor(private ninjaService: NinjaService) { }

  ngOnInit() {
    this.ninjaService.getFinales().subscribe(finales => {
      this.finales = finales;
    });
  }

}
