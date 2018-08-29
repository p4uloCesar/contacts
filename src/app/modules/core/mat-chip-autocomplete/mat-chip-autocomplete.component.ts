import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatInput} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ToastService} from '../../../services/toast-service';

@Component({
  selector: 'app-mat-chip-autocomplete',
  templateUrl: './mat-chip-autocomplete.component.html',
  styleUrls: ['./mat-chip-autocomplete.component.scss']
})
export class MatChipAutocompleteComponent implements OnInit {

  @Input()
  disabled: any;
  @Input()
  setFocus= true;
  @ViewChild('chipInput')
  chipInput: MatInput;
  @Input()
  valuesAutoComplete: any[] = [];
  @Input()
  items: any[] = [];
  @Input()
  remove: (item: any) => void;
  nameToSearch: String = '';

  @Input()
  anyValues: boolean = true;

  public descriptionItem = '';

  constructor(private toast: ToastService) { }

  ngOnInit(): void {
  }


  itemsFiltered(name: any): any[] {
    return this.arrayDiffObj(this.valuesAutoComplete, this.items);
  }


  arrayDiffObj(s: any[], v: any[]) {
    const reducedIds = v.map((o) => o.description.toLowerCase());
    return s.filter((obj: any) => reducedIds.indexOf(obj.description.toLowerCase()) === -1
      && obj.description.toLowerCase().indexOf(this.nameToSearch.toLowerCase()) === 0
    );
  }


  add(event: MatAutocompleteSelectedEvent): void {
    const t: any = event.option.value;
    this.items.push(t);
    this.chipInput['nativeElement'].blur();
    this.chipInput['nativeElement'].value = '';
    if (this.setFocus) {
      this.chipInput['nativeElement'].focus();
    }
  }

  addNew(input: MatInput): void {
    let description = input.value ? input.value : this.descriptionItem;

    if(!this.anyValues){
      const index = this.valuesAutoComplete.findIndex(i => i.description.toLowerCase() === description.toLowerCase());
      if(index === -1){
        this.toast.warning('atention', 'Invalid Item');
        return;
      }
    }

    let newValue: any =  this.valuesAutoComplete.find(v => v.description.toLowerCase() === description.toLowerCase());
    if (!newValue) {
      newValue = {id: null, description: description};
    }
    const value = this.items.filter(v => v.description.toLowerCase() === newValue.description.toLowerCase());
    if (newValue.description !== null && newValue.description !== '' && value.length === 0) {
      this.items.push(newValue);
      this.chipInput['nativeElement'].value = '';
    }
  }


  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.description : value;
  }


  onKeyUp(value) {
    this.nameToSearch = value;
  }
}
