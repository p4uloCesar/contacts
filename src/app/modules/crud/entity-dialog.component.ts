import {ToastService} from '../../services/toast-service';
import {TranslateService} from '../../translate/translate.service';
import {ModelBase} from '../../models/model-base';
import {BaseService} from '../../services/base.service';
import {Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


export abstract class EntityDialogComponent<T extends ModelBase> implements OnInit {
  

  constructor( public dialogRef: MatDialogRef<any>,
               @Inject(MAT_DIALOG_DATA)public data: T,
               public service: BaseService<any>,
               public toast: ToastService,
               public translate: TranslateService
  ) {}

  ngOnInit() {
  }

  public save(): void{
    if (!this.data.id) {
      this.service.save(this.data).subscribe(
        (response) => {
          this.showSucessMessage();
        },
        ex => {
          this.showError(ex);
        });
    } else {
      this.service.update(this.data.id, this.data).subscribe(
        (response) => {
          this.showSucessMessage();
        },
        ex => {
          this.showError(ex);
        });
    }
  }

  
  public showError(ex) {
    if (ex._body !== undefined){
      const bodyError = JSON.parse(ex._body);
      if (bodyError.businessMessage !== undefined && bodyError.businessMessage !== null) {
        this.toast.error(this.translate._('MSG_ERROR'), this.translate._(bodyError.businessMessage.target));
      } else {
        this.toast.error(this.translate._('MSG_ERROR'), this.translate._(bodyError.detail));
      }
    } else {
      this.toast.error(this.translate._('MSG_ERROR'), ex);
    }

  }

  public showSucessMessage(): void{
    this.dialogRef.close(true);
    this.toast.success(this.translate._('toast-sucess-title'),this.translate._('toast-saved-successfully'));
  }

  public closeDialog(): void{
    this.dialogRef.close(false);
  }


}
