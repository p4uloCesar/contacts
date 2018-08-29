import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {
  MatTableDataSource,
  MatInput,
  MatDialog,
  MatSort,
  MatDatepicker,
  DateAdapter,
  MAT_DATE_LOCALE, MAT_DATE_FORMATS
} from '@angular/material';

import {TranslateService} from '../../../translate/translate.service';
import {TitlePageService} from '../../../services/title-page.service';
import {ToastService} from '../../../services/toast-service';
import {DataSeriesService} from '../../../services/data-series.service';

import {FormControl, NgForm} from '@angular/forms';
import {DataSeries} from '../../../models/data-series';



import * as moment from 'moment';

import {default as _rollupMoment, Moment, now} from 'moment';

const moment_ = _rollupMoment || moment;

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {EntityListComponent} from '../../crud/entity-list.component';
import {BaseService} from '../../../services/base.service';
import {DataSeriesDialogComponent} from '../data-series-dialog/data-series-dialog.component';
import {DOCUMENT} from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-actual-expenses-list',
  templateUrl: './data-series-list.component.html',
  styleUrls: ['./data-series-list.component.scss'],
  providers: [DataSeriesService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class DataSeriesListComponent extends EntityListComponent<DataSeries> implements OnInit {

  @ViewChild('file')
  inputFile: any;

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  sort: MatSort;
  isClearSeach = false;

  dt_initial = '';
  dt_final = '';

  date = new FormControl();
  dateFinal = new FormControl();

  INITIAL_FINAL = {
    PRIMEIRO_DIA: '01',
    ULTIMO_DIA: '31'
  };

  public selection = new SelectionModel<DataSeries>(true, []);
  public ledgerDataSeries = new DataSeries();
  public dialogComponet = DataSeriesDialogComponent;

  constructor(@Inject(DOCUMENT) private document: any,
              public service: DataSeriesService,
              public dialog: MatDialog,
              public toast: ToastService,
              public translate: TranslateService,
              public pageTitleService: TitlePageService) {
    super(service, dialog, toast, translate, pageTitleService);

  }
  addParamentersFilters(serviceFilter: BaseService<DataSeriesService>): void {
    if (this.dt_initial) {
      this.service.addParameter('period_gte', String(this.dt_initial) );

    }
    if (this.dt_final) {
      this.service.addParameter('period_lte',  String(this.dt_final) );
    }
  }

  getSubTitle(): string {
    return this.translate._('ACTUAL_EXPENSES');
  }

  public getDisplayedColumns(): string[] {
    return ['select', 'month_year', 'file_name', 'text', 'settings'];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  chosenYearHandler(normalizedYear: Moment) {
    this.date = new FormControl(moment_());
    // oly see year
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>, event: any) {
    // oly see month
    const ctrlValue = this.date.value;
    ctrlValue.date(this.INITIAL_FINAL.PRIMEIRO_DIA);
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.dt_initial = moment(this.date.value._d).format('YYYY-MM-DD');
  }

  chosenYearHandlerFinal(normalizedYear: Moment) {
    this.dateFinal = new FormControl(moment_());
    // oly see year
    const ctrlV = this.dateFinal.value;
    ctrlV.year(normalizedYear.year());
    this.dateFinal.setValue(ctrlV);
  }

  chosenMonthHandlerFinal(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>, event: any) {
    // oly see month
    const ctrlV = this.dateFinal.value;
    ctrlV.date(this.INITIAL_FINAL.ULTIMO_DIA);
    ctrlV.month(normlizedMonth.month());
    this.dateFinal.setValue(ctrlV);
    datepicker.close();
    this.dt_final = moment(this.dateFinal.value._d).format('YYYY-MM-DD');
  }

  public resetForm() {
    this.fromInput.value = '';
    this.toInput.value = '';
  }

  /* limpa o formulario de pesquisa */
  public clearFilter(form: NgForm) {

    this.dt_final = '';
    this.dt_initial = '';

    if (this.isClearSeach) {
      this.isClearSeach = false;
    }

    this.resetForm();
    this.retrieve(this.paginator);
  }

  public downloadFile(element: DataSeries) {
    this.document.location.href = element.original_file;
  }
}




