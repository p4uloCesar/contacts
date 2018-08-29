import {Component, Input, OnInit} from '@angular/core';
import {ItemUrl} from './item-url';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input()
  itensUrl: ItemUrl[] = [];
  constructor() { }

  ngOnInit() {
  }

}
