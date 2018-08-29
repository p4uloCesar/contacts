import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TranslateService} from '../../../translate/translate.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public description = '';
  public title = '';
  public btOk= '';
  public btCancel= '';
  public subTitle= '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _translate: TranslateService) {
  }

  ngOnInit() {
    if (this.data.description) {
      this.description = this._translate._('MSG_LABEL_CONFIRM').replace('$description', this._translate._(this.data.description));
    } else {
      this.description = this._translate._('MSG_LABEL_CONFIRM').replace('$description', this._translate._(this.data.description));
    }
    if (this.data.subTitle) {
      this.subTitle = this._translate._(this.data.subTitle);
    }
    if (this.data.title) {
      this.title = this._translate._(this.data.title);
    } else {
      this.title = this._translate._('MSG_ATTENTION');
    }
    if (this.data.btOk) {
      this.btOk = this._translate._(this.data.btOk);
    } else {
      this.btOk = this._translate._('label-yes');
    }

    if (this.data.btCancel) {
      this.btCancel = this._translate._(this.data.btCancel);
    } else {
      this.btCancel = this._translate._('label-no');
    }
  }

}
