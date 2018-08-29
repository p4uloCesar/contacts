import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AppContains} from "./app-contains";

@Directive({
  selector: '[appShow]'
})
export class ShowDirective implements OnInit  {
  @Input() appNames: string[];

  constructor( private elementRef: ElementRef) {

  }




  ngOnInit() {
    const  contains = new AppContains().contains(this.appNames);
    if (!contains) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }

}
