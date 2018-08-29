import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tree-children',
  templateUrl: './tree-children.component.html',
  styleUrls: ['./tree-children.component.scss']
})

export class TreeChildrenComponent implements OnInit {
  @Input() node;
  constructor() { }

  ngOnInit() {
  }

}
