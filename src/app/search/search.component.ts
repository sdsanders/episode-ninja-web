import { Component, OnInit, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { NinjaService } from '../ninja.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @ViewChild('form') form: any;
  public searchQuery: string = '';
  public items: any[] = [];

  constructor(
    private ninjaService: NinjaService
  ) {}

  ngOnInit() {
    this.form.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(form => {
        if (form.search) {
          this.getItems(form.search);
        }
      });
  }

  getItems(val: string) {
    this.ninjaService.search(val).subscribe(results => {
      this.items = results;
    });
  }

}
