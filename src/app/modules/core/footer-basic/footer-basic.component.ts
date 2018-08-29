import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  selector: 'app-footer-basic',
  templateUrl: './footer-basic.component.html',
  styleUrls: ['./footer-basic.component.scss']
})
export class FooterBasicComponent implements OnInit {
  @Input()
  urlCancel: string;

  @Input()
  requeridForm: boolean;

  @Output() actionButtonSubmit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  clicado(item) {
    this.actionButtonSubmit.emit({text: item });
  }
}

