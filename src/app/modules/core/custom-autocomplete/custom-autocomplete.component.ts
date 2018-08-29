import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomAutocompleteComponent implements OnInit {

  @Input()
  service: any;
  @Input()
  placeholder: String;
  @Input()
  required = false;
  formControl: FormControl = new FormControl();
  list: any[];
  @Output()
  changeItem = new EventEmitter();
  @Output()
  defaultSearch = new EventEmitter();
  @Input()
  valueText: string;
  @Input()
  get_params: string;

  ngOnInit() {
    this.formControl.valueChanges.debounceTime(400)
      .subscribe(
        (name) =>  {
          if (name && name.trim() !== '') {
            this.service.addParameter('description', String(name));
            if (this.get_params) {
              this.service.addParameter('codename', String(this.get_params));
            }
            this.service.getPaginated().subscribe(
              response => {
                this.list = response;
              },
              error2 => {

              }

            ); }
        }

      );
  }

  public change(item: any) {
    this.changeItem.emit(item);
  }

  public search(event: any) {
    if(event.target.value.length == 0){
      this.defaultSearch.emit();
    }
  }

}
