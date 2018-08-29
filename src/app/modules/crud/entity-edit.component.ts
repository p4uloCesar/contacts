import { Component, OnInit } from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../services/toast-service';
import {TitlePageService} from '../../services/title-page.service';
import {TranslateService} from '../../translate/translate.service';
import {ModelBase} from '../../models/model-base';
import {BaseService} from '../../services/base.service';


export abstract class EntityEditComponent<T extends ModelBase> implements OnInit {



  entityForm: T = {} as T;
  form: NgForm;
  urlReturn = '';
  isNew = false;


  constructor(protected service: BaseService <any>,
              protected toast: ToastService,
              protected translate: TranslateService,
              protected router: Router,
              protected route: ActivatedRoute,
              protected pageTitleService: TitlePageService) {}

  ngOnInit() {
    this.initViewByParameters();
    this.pageTitleService.setSubTitle(this.getSubTitle());
    this.pageTitleService.setShowBtnRouter('production-line');
    this.urlReturn = this.getUrlReturnDefault();
  }

  public abstract getUrlReturnDefault(): string;
  public abstract getSubTitle(): string;

  public initViewByParameters(): void {
    this.route.params
      .subscribe((value) => {
        const idParaments = +value['id'];
        if (idParaments) {
          this.isNew = false;
          this.retrieveById(idParaments);
        } else {
          this.isNew = true;
          this.postRetrive(this.entityForm);
        }
      });
  }


  public postRetrive( entityForm: T): void {
  }
  public retrieveById(id: number): void {
    this.service.clearParameter();
    this.service.getById(id).subscribe(
      (response) => {
        this.entityForm = response;
        this.postRetrive(this.entityForm);

      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      });
  }

  public saveOrUpdate(): void {
    this.preSave(this.entityForm);
    if (!this.entityForm.id) {
      this.service.save(this.entityForm).subscribe(
        (response) => {
          this.postCreate();
          this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('toast-saved-successfully'));
        },
        ex => {
          this.showError(ex);
        });
    } else {
      this.service.update(this.entityForm.id, this.entityForm).subscribe(
        (response) => {
          this.postUpdate();
          this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('toast-saved-successfully'));
        },
        ex => {
          this.showError(ex);
        });
    }
  }

  public showError(ex) {
    const bodyError = JSON.parse(ex._body);
    if (bodyError.businessMessage !== undefined && bodyError.businessMessage !== null) {
      this.toast.error(this.translate._('MSG_ERROR'), this.translate._(bodyError.businessMessage.target));
    } else {
      this.toast.error(this.translate._('MSG_ERROR'), ex);
    }
  }

  protected  preSave(entityForm: T) {
  }

  protected  postCreate() {
    this.navigateReturnPage();
  }

  protected  postUpdate() {
    this.navigateReturnPage();
  }

  protected postInit(event: any) {
    event();
  }

  public navigateReturnPage() {
    this.router.navigate([this.urlReturn]);
  }

  public refresh(): void {
    this.ngOnInit();
  }

}
