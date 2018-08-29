import {Component, OnInit, ViewChild} from '@angular/core';
import {TitlePageService} from '../../../services/title-page.service';
import {TranslateService} from '../../../translate/translate.service';
import {ToastService} from '../../../services/toast-service';
import {Employee} from '../../../models/employee';
import {ProfileService} from '../../../services/profile-configuration.service';
import {EmployeeService} from '../../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {GroupService} from '../../../services/group.service';
import {Group} from '../../../models/group';
import {MatDialog} from '@angular/material';
import {EntityEditComponent} from '../../crud/entity-edit.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers: [ProfileService]
})
export class EmployeeEditComponent extends EntityEditComponent<Employee> implements OnInit {

  public employee: Employee;
  public groups: Group[] = [];
  public user: User = new User();
  hide = true;
  public canChangeEmployeesPasswords = false;


  constructor(protected pageTitleService: TitlePageService,
              protected toast: ToastService,
              protected translate: TranslateService,
              protected service: EmployeeService,
              protected route: ActivatedRoute,
              protected router: Router,
              private serviceProf: GroupService,
              protected dialog: MatDialog) {

    super(service, toast, translate, router, route, pageTitleService);
  }


  ngOnInit() {
    super.ngOnInit();
    this.retriveGroups();

  }

  public postRetrive( entityForm: Employee): void {
    if ( this.isNew) {
      this.user =  new User();
      this.user.employee = entityForm.id;
      this.user.groups = [];
      this.user.group_list = [];
    } else {
      this.user = entityForm.user_obj;
      if ( this.user.groups === null) {
        this.user.groups = [];
        this.user.group_list = [];
      }
    }

  }

  private retriveGroups() {
    this.serviceProf.getAll().subscribe(response => {
        if (response.length > 0) {
          this.groups = response;
        }
      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      });
  }

  getUrlReturnDefault(): string {
    return '/employee';
  }

  getSubTitle(): string {
    return this.translate._('LABEL_EDIT');
  }
  public get_groups() {
    const groups = [];
    if (this.user.group_list != null) {
      for (const a of this.user.group_list) {
        groups.push(a.id);
      }
    }
    return groups;
  }

  protected  preSave(entityForm: Employee) {
    entityForm.user_obj = this.user;
    entityForm.user_obj.groups = this.get_groups();
  }

}
