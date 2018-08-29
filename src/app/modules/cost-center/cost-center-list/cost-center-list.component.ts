import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseListComponent} from "../../core/base-list.component";
import {TitlePageService} from "../../../services/title-page.service";
import {TranslateService} from "../../../translate/translate.service";
import {MatPaginator} from "@angular/material";

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrls: ['./cost-center-list.component.scss']
})
export class CostCenterListComponent extends BaseListComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  public node = {};

  month_list=['janeiro', 'fevereiro'];
  year_list = ['2018','2017'];

  month_value = '';
  year_value = '';

  panelOpenState = false;

  constructor(public translate: TranslateService, public pageTitleService: TitlePageService) { super(); }

  ngOnInit() {
    this.pageTitleService.setSubTitle(this.translate._('ACTUAL_EXPENSES'));
    this.pageTitleService.setShowBtnRouter('');
    this.createTree()
  }

  public search() {
  }

  public createTree() {
    /****
     * recursividade para montar o caminho
     * @type {{children: {name: 'string'; url: 'string'; children: {name: 'string'; url: 'string'; children: any[]}[]}[]}}
     */
    this.node = {
      children: [{
        name: 'Actual expense', url: '/ledgerdataseries/',
        children: [{
          name: 'Cost Center',
          url: '',
          children: []
        }]
      }]
    };
  }

  retrieveList() {
  }

}
