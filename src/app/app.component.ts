import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private titleService: Title, @Inject(DOCUMENT)private _document: HTMLDocument) {

    this.titleService.setTitle(environment.appName);
  }

  ngOnInit() {}


}
