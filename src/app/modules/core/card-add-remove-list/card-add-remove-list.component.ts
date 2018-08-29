import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatInput} from '@angular/material';

@Component({
  selector: 'app-add-remove-table',
  templateUrl: './card-add-remove-list.html',
  styleUrls: ['./card-add-remove-list.component.scss']
})
export class AddRemoveTableComponent implements OnInit {
  @Input()
  disabled: any;
  @Input()
  title: string;
  @Input()
  items: any[] = [];
  @Input()
  codPlaceholder: string;
  @Input()
  descPlaceholder: string;
  @Input()
  remove: (item: any) => void;
  @Input()
  valuesAutoComplete: any[] = [];
  @ViewChild('input')
  matInput: MatInput;

  codeItem = '';
  descriptionItem = '';

  codeToSearch = '';
  descriptionToSearch = '';

  constructor() { }

  ngOnInit() {}

  public itemsFiltered(filter: any): any[] {
    return this.arrayDiffObj(this.valuesAutoComplete, this.items, filter);
  }

  private arrayDiffObj(autoCompleteValues: any[], values: any[], filter: string) {

    let reducedDescription = [];

    if (values && values.length > 0) {
      reducedDescription = values.map((o) => o.description.toLowerCase());
    }

    if (filter === 'code') {
      return autoCompleteValues.filter((obj: any) =>
        reducedDescription.indexOf(obj.description.toLowerCase()) === -1
        && obj.code.toLowerCase().indexOf(this.codeToSearch.toLowerCase()) === 0);
    } else {
      return autoCompleteValues.filter((obj: any) =>
        reducedDescription.indexOf(obj.description.toLowerCase()) === -1
        && obj.description.toLowerCase().indexOf(this.descriptionToSearch.toLowerCase()) === 0);
    }
  }

  public addItem() {

    if (!(this.codeItem !== '' && this.descriptionItem !== '')) {
    } else {
      let objToAdd;
      if (!this.items.find(obj => obj.description === this.descriptionItem && obj.code === this.codeItem)) {
        const objSearched = this.valuesAutoComplete.find(obj => obj.description === this.descriptionItem);


        if (objSearched) {
          objToAdd = objSearched;
        } else {
          objToAdd = {code: this.codeItem, description: this.descriptionItem };
        }

        this.items.push(objToAdd);
        this.codeItem = '';
        this.descriptionItem = '';
      }

    }

  }

  public add(event: MatAutocompleteSelectedEvent): void {
    const model: any = event.option.value;

    this.codeItem = model.code;
    this.descriptionItem = model.description;

  }

  public displayFnCode(value: any): string {
    return value && typeof value === 'object' ? value.code : value;
  }

  public displayFnDescription(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }

  onKeyUpCode(value) {
    this.codeToSearch = value;
  }

  onKeyUpDescription(value) {
    this.descriptionToSearch = value;
  }

   private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
