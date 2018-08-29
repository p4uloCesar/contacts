import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '../../../translate/translate.service';
import {MatAutocompleteSelectedEvent, MatInput} from '@angular/material';
import {ToastService} from '../../../services/toast-service';
import {ModelBase} from '../../../models/model-base';

@Component({
  selector: 'app-group-add-remove',
  templateUrl: './group-add-remove.component.html',
  styleUrls: ['./group-add-remove.component.scss']
})
export class GroupAddRemoveComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  enable_edit: boolean;
  @Input()
  items: any[] = [];
  @Input()
  descPlaceholder: string;

  @Input()
  valuesAutoComplete: any[] = [];
  @ViewChild('input')
  matInput: MatInput;
  @Input()
  modelDescription: string;
  @Input()
  required: boolean;


  public focusButton = new EventEmitter<boolean>();
  public returnFocusInput = new EventEmitter<boolean>();
  codeItem = '';
  descriptionToSearch = '';

  constructor( private translate: TranslateService,
               private toast: ToastService) {
  }

  ngOnInit() {}

  public itemsFiltered(): any[] {
    return this.arrayDiffObj(this.valuesAutoComplete, this.items);

  }

  private arrayDiffObj(valuesAutoComplete: any[], values: any[]) {
    let reducedDescription = [];

    if (values && values.length > 0) {
      reducedDescription = values.map((o) => o.name.toLowerCase());
    }

    return valuesAutoComplete.filter((obj: any) =>
      reducedDescription.indexOf(obj.name.toLowerCase()) === -1
      && obj.name.toLowerCase().indexOf(this.descriptionToSearch.toLowerCase()) === 0);
  }

  public addItem() {
    if (!this.modelDescription) {
      this.toast.warning(this.translate._('MSG_ATTENTION'), this.translate._('label-select-the-item'));
      return;
    }

    let objToAdd;
    if (!this.items.find(obj => obj.name.toLowerCase() === this.modelDescription.toLowerCase())) {
      const objSearched = this.valuesAutoComplete.find(obj => obj.name === this.modelDescription);
      if (objSearched) {
        objToAdd = objSearched;
        this.focusButtonMethod();
      } else {
        objToAdd = {id: null, description: this.modelDescription};
        this.FocusInputMethod();
      }

      this.items.push(objToAdd);
    }
    this.modelDescription = '';
    this.itemsFiltered();

  }

  public focusButtonMethod() {
    this.focusButton.emit(true);
  }

  public FocusInputMethod() {
    this.returnFocusInput.emit(true);
  }

  public add(event: MatAutocompleteSelectedEvent): void {
    const model: any = event.option.value;
    this.modelDescription = model.name;

    this.addItem();

  }

  public displayFnDescription(value: any): string {
    return;
  }

  onKeyUpDescription(value) {
    this.descriptionToSearch = value;
  }

  // Effect
  public remove  (item: ModelBase) {
    const item_remove = this.items.find(value => value.id === item.id);
    this.items.splice(this.items.indexOf(item_remove), 1);
  }



}
