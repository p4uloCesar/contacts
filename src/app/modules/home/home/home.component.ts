import {AfterViewInit, Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ToastService} from '../../../services/toast-service';
import {TranslateService} from '../../../translate/translate.service';
import {AuthTokenService} from '../../../services/auth-token.service';
import {TitlePageService} from "../../../services/title-page.service";
import {DataSeries} from "../../../models/data-series";
import * as moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker} from "@angular/material";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DataSeriesService} from "../../../services/data-series.service";
import {FormControl} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Router} from "@angular/router";
const moment_ = _rollupMoment || moment;


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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})




export class HomeComponent implements OnInit, AfterViewInit {
  data_series: DataSeries = new DataSeries();
  date = new FormControl(moment_());
  public fileNameUpload: FileUploader;
  public leaveClick = true;
  constructor(private service: DataSeriesService,
              private router: Router,
              private toast: ToastService,
              private translate: TranslateService,
              private tokenService: AuthTokenService,
              private pageTitleService: TitlePageService) { }

  public name_logo= '';
  public appName: string;

  ngOnInit() {
    this.pageTitleService.setSubTitle(this.translate._('WELCOME_LABEL'));

    this.appName = environment.appName;
    this.name_logo = 'HUMAX';
  }

  public exitEmployee() {
    this.leaveClick = false;
  }


  public getUser(): number {
    return this.tokenService.getUserId();
  }


  ngAfterViewInit() {
    this.initializeDate();
  }

  public initializeDate(): any {
    const ctrlValue = this.date.value;
    ctrlValue.date('01');
    this.date.setValue(ctrlValue);
    this.data_series.period = moment(this.date.value._d).format('YYYY-MM-DD');
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
  }

  public fileChangePdf(event) {
    if (event.target.files.length > 0) {
      this.fileNameUpload = event.target.files[0].name;
      const file = event.target.files[0];
      if (file) {
        this.data_series.original_file = file;
      }
    }
  }

  public saveWithFile() {
    console.log(this.data_series)
      this.service.saveWithFile(this.data_series).subscribe(
        (response) => {
          this.showSucessMessage();
        },
        ex => {
          this.showError(ex);
        });

  }

  public showError(ex) {
    const bodyError = JSON.parse(ex._body);
    if (bodyError.businessMessage !== undefined && bodyError.businessMessage !== null) {
      this.toast.error(this.translate._('MSG_ERROR'), this.translate._(bodyError.businessMessage.target));
    } else {
      this.toast.error(this.translate._('MSG_ERROR'), ex);
    }
  }

  public showSucessMessage(): void{
    this.toast.success(this.translate._('toast-sucess-title'),this.translate._('toast-saved-successfully'));
    this.router.navigate(['../modules/ledgerdataseries/']);
  }

}
