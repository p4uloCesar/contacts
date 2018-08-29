import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatInput,
  MatDialog, MatPaginator, MatTableDataSource
} from '@angular/material';

import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from "../../../translate/translate.service";
import {TitlePageService} from "../../../services/title-page.service";
import {ToastService} from "../../../services/toast-service";

import {LedgerService} from "../../../services/ledger.service";
import {Ledger} from "../../../models/ledger";

import * as moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import {EntityListComponent} from "../../crud/entity-list.component";
import {DataSeries} from "../../../models/data-series";
import {DataSeriesService} from "../../../services/data-series.service";
import {CostCenterService} from "../../../services/cost-center.service";
import {CostCenter} from "../../../models/cost-center";

const moment_ = _rollupMoment || moment;


//TODO A LISTAGEM DE COSTCENTER
export interface costCenter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss'],
  providers: [LedgerService
  ]

})
export class LedgerListComponent extends EntityListComponent<Ledger> implements OnInit {

  selectedValue: string;

  @ViewChild('file')
  inputFile: any;

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;



  isClearSeach = false;

  dt_initial = '';
  dt_final = '';

  date = new FormControl();
  dateFinal = new FormControl();

  data_series: DataSeries = new DataSeries();
  cost_center: CostCenter[] = [];
  node = {};

  constructor(public service: LedgerService,
              public dialog: MatDialog,
              public toast: ToastService,
              public translate: TranslateService,
              public pageTitleService: TitlePageService,
              public route: ActivatedRoute,
              public _dataSeries: DataSeriesService,
              public _costCenter: CostCenterService){

    super(service, dialog, toast, translate, pageTitleService);


  }
  public initByParameters(): void {
    this.route.params
      .subscribe((value) => {
        this.data_series.id = value['id'];
        if ( this.data_series.id ) {
          this.getByIdDataSeries(this.data_series.id)
          this.service.addParameter('data_series',  this.data_series.id);
        }
      });
  }

  /**
   * send params of api
   */
  addParamentersFilters(): void {

    if (this.dt_initial) {
      this.service.addParameter('posting_date_gte', String(moment(this.dt_initial).format('YYYY-MM-DD')) );

    }
    if (this.dt_final) {
      this.service.addParameter('posting_date_lte',  String(moment(this.dt_final).format('YYYY-MM-DD')) );
    }
    if (this.selectedValue) {
      this.service.addParameter('cost_center',  this.selectedValue );
    }
    this.initByParameters();
  }


  /**
   * show title in table
   */
  public getDisplayedColumns(): string[] {
    return ['posting_date', 'posting_period', 'document_type', 'cost_center', 'amount', 'text'];
  }

  /**
   * clear the calendar form
   */
  public resetForm() {
    this.fromInput.value ='';
    this.toInput.value = ''
  }

  /**
   * clear the fields form
   */
  public clearFilter() {

    this.dt_final = '';
    this.dt_initial='';
    this.selectedValue='';

    if (this.isClearSeach) {
      this.isClearSeach = false;
    }

    this.resetForm();
    this.retrieve(this.paginator)
  }

  /**
   * Funcao: Faz a pesquisa do dataSeries e obtem como resposta o id e description
   * @param id - recebe o parametro do rota
   */

  public getByIdDataSeries(id: number){
    this._dataSeries.getById(id).subscribe(
      response => {
        this.data_series = response;
        this.getByIdCostCenter(this.data_series.cost_center_group)

        this.createTree();
      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      }
    );
  }

  public getByIdCostCenter(cost_center_group: number){
    this._costCenter.clearParameter();

    this._costCenter.addParameter('group', String(cost_center_group) );

    this._costCenter.getAll().subscribe(
      response => {
        this.cost_center = response;
      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      }
    );
  }


  public createTree() {
    /****
     * recursividade para montar o caminho
     * @type {{children: {name: 'string'; url: 'string'; children: {name: 'string'; url: 'string'; children: any[]}[]}[]}}
     */
    this.node = {
      children: [{
        name: 'Data Series', url: '/ledgerdataseries/',
        children: [{
          name: `${this.data_series.description}`,
          url: '',
          children: []
        }]
      }]
    };
  }

  getSubTitle(): string {
    return ""
  }

}
