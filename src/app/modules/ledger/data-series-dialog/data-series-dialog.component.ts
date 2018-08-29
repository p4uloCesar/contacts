import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {EntityDialogComponent} from '../../crud/entity-dialog.component';
import {ToastService} from '../../../services/toast-service';
import {TranslateService} from '../../../translate/translate.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from '@angular/material';
import {DataSeriesService} from '../../../services/data-series.service';
import {FileUploader} from 'ng2-file-upload';
import * as moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';

const moment_ = _rollupMoment || moment;

import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DataSeries} from "../../../models/data-series";



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
  selector: 'app-actual-expenses-dialog',
  templateUrl: './data-series-dialog.component.html',
  styleUrls: ['./data-series-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class DataSeriesDialogComponent  extends EntityDialogComponent<DataSeries> implements OnInit, AfterViewInit {
  date = new FormControl(moment_());
  public fileNameUpload: FileUploader;

  constructor(public dialogRef: MatDialogRef<DataSeriesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DataSeries,
              public service: DataSeriesService,
              public toast: ToastService,
              public translate: TranslateService) {
    super(dialogRef, data, service, toast, translate);
  }

  ngAfterViewInit() {
    this.initializeDate();
  }

  public initializeDate(): any {
    const ctrlValue = this.date.value;
    ctrlValue.date('01');
    this.date.setValue(ctrlValue);
    this.data.period = moment(this.date.value._d).format('YYYY-MM-DD');
    return this.date.value;

  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>, event: any) {
    const ctrlValue = this.initializeDate();
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.data.period = moment(this.date.value._d).format('YYYY-MM-DD');
  }

  public fileChangePdf(event) {
    if (event.target.files.length > 0) {
      this.fileNameUpload = event.target.files[0].name;
      const file = event.target.files[0];
      if (file) {
        this.data.original_file = file;
      }
    }
  }

  public saveWithFile() {
    console.log(this.data);
    if (!this.data.id) {
      this.service.saveWithFile(this.data).subscribe(
        (response) => {
          this.showSucessMessage();
        },
        ex => {
          this.showError(ex);
        });
    } else {
      this.service.updateWithFile(this.data.id, this.data).subscribe(
        (response) => {
          this.showSucessMessage();
        },
        ex => {
          this.showError(ex);
        });
    }
  }

}
