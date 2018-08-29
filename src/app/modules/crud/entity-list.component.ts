import {ModelBase} from '../../models/model-base';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../core/dialog/dialog.component';
import {ToastService} from '../../services/toast-service';
import {AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {TitlePageService} from '../../services/title-page.service';
import {TranslateService} from '../../translate/translate.service';
import {BaseService} from '../../services/base.service';
import {DataSeries} from '../../models/data-series';
import {NgForm} from "@angular/forms";



export abstract class EntityListComponent <T extends ModelBase> implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  public  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  public resultList: T[];
  public isClearSeach = false;

  // filtro de pesquisa- exibir e ocultar o botão de filtro
  public changeFieldEvent(event) {
    this.isClearSeach = (event !== null && event !== '');
  }

  /* limpa o campo de pesquisa quando for um auto-complete*/
  public clearFilter(form: NgForm) {
    form.resetForm({});
    if (this.isClearSeach) {
      this.isClearSeach = false;
    }
    this.retrieve(this.paginator);

  }



  constructor(public service: BaseService<any>,
              public dialog: MatDialog,
              public toast: ToastService,
              public translate: TranslateService,
              public pageTitleService: TitlePageService) {
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = this.translate._('LABEL_PAGE');
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [10, 20, 30, 40, 50];
    this.pageTitleService.setSubTitle(this.getSubTitle());
    this.pageTitleService.setShowBtnRouter('');
  }


  public abstract getDisplayedColumns(): string[];

  public abstract getSubTitle(): string;

  public abstract addParamentersFilters(serviceFilter: BaseService<any>): void;

  ngAfterViewInit() {
    this.retrieve(this.paginator);
  }

  public search() {
    this.paginator.pageIndex = 0;
    this.retrieve(this.paginator);
  }


  public retrieve(event: any): void {
    this.service.clearParameter();
    this.service.addParameter('limit', String(this.paginator.pageSize));
    this.service.addParameter('offset', String(this.paginator.pageIndex));
    this.addParamentersFilters(this.service);


    this.service.getPaginated().subscribe(
      response => {
        this.resultList = response.results;
        this.paginator.length = response.count;
        this.dataSource = new MatTableDataSource(this.resultList);
      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      }
    );
  }

  public delete(entity: T): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {id: entity.id, description: this.translate._('MSG_CONFIRM_REMOVE')}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'data') {
        this.service.delete(entity.id).subscribe(
          (response) => {
            this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('MSG_SUCCESS_DELETE'));
            this.retrieve(this.paginator);
          },
          ex => {
          });
      }
    });
  }


  public openDialog(entity: T, width: string, dialogComponent: any): void {
    const data = entity;
    width = width + 'px';
    this.dialog.open(dialogComponent, {
      width: width,
      data: data
    }).afterClosed().subscribe(result => {
      if (result) {
        this.retrieve(this.paginator);
      }
    });
  }
}
