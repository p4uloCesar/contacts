import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TitlePageService} from '../../../services/title-page.service';

import {Employee} from '../../../models/employee';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EmployeeService} from '../../../services/employee.service';
import {TranslateService} from '../../../translate/translate.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../../services/toast-service';
import {DialogComponent} from '../../core/dialog/dialog.component';
import {Utils} from '../../../utils/utils';
import {FormControl, NgForm} from '@angular/forms';
import {BaseListComponent} from '../../core/base-list.component';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent extends BaseListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild('file')
  inputFile: any;

  sort: MatSort;
  employee: Employee[];
  descriptionFilter: String;
  fieldSearch: string;


  public departmentFormCtrl: FormControl = new FormControl();
  public filteredDepartment: Observable<any[]>;

  constructor(public dialog: MatDialog,
              private service: EmployeeService,
              private toast: ToastService,
              private translate: TranslateService,
              private pageTitleService: TitlePageService) { super() }

  ngOnInit() {
    this.fieldSearch = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [10, 20, 30, 40, 50];
    this.pageTitleService.setSubTitle('EMPLOYEE_TITLE_LIST');
    this.pageTitleService.setShowBtnRouter('');
  }

  ngAfterViewInit() {
    this.retrieveList();
  }

  public search() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.retrieveList();
  }

  public retrieveList(): void {
    this.service.clearParameter();
    this.service.addParameter('limit', String(this.paginator.pageSize));
    this.service.addParameter('offset',
      String(Utils.getOffset(this.paginator.pageIndex, this.paginator.pageSize))
    );
    if (this.descriptionFilter) {
      this.service.addParameter('description', String(this.descriptionFilter));
    }
    this.service.getPaginated().subscribe(
      response => {
        this.employee = response.results;
        this.paginator.length = response.count;
        this.dataSource = new MatTableDataSource(this.employee);
      },
      ex => {
      }
    );
  }


  public delete(param: Employee): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {id: param.id, description: this.translate._('MSG_CONFIRM_REMOVE')}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'data' ) {
        this.service.delete(param.id).subscribe(
          (response) => {
            this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('MSG_SUCCESS_DELETE'));
            this.retrieveList();
          },
          ex => {
          });
      }
    });
  }








  public fileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const invalidFile = file.name.split('.').pop().toLocaleLowerCase() !== 'csv';
      if (!invalidFile) {
        this.service.importEmplyees(file).subscribe(
          (response) => {
            this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('label-import-success'));
            this.inputFile.nativeElement.value = '';
            this.retrieveList();
          },
          ex => {
            this.inputFile.nativeElement.value = '';
            this.toast.error(this.translate._('MSG_ERROR'), ex);
          });
      } else {
        this.inputFile.nativeElement.value = '';
        this.toast.error(this.translate._('MSG_ERROR'), this.translate._('label-file-invalid'));
      }

    }
  }
  public clearFilter(form: NgForm) {
    this.descriptionFilter = '';
    this.fieldSearch = '';

    if (this.isClearSeach) {
      this.isClearSeach = false;
    }

    this.retrieveList();
  }
  ngOnDestroy() { }
}
