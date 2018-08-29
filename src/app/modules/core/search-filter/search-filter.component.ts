import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Input()
  isClearSeach: boolean;


  constructor() { }

  @Output() actionButtonSubmit = new EventEmitter();

  @Output() clearFilterList = new EventEmitter();

  ngOnInit() {
  }

  public clicked(item) {
    this.actionButtonSubmit.emit({text: item });
  }

  public clearFilter(item) {
    this.clearFilterList.emit({text: item });
  }


}
