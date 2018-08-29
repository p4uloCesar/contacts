import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import {GroupService} from '../../../services/group.service';
import {ProfilePermissionService} from '../../../services/profile-permission.service';
import {ToastService} from '../../../services/toast-service';
import {TranslateService} from '../../../translate/translate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TitlePageService} from '../../../services/title-page.service';
import {PermissionService} from '../../../services/permission.service';
import {Permission} from '../../../models/permission';
import {Group} from '../../../models/group';

@Component({
  selector: 'app-profile-configuration-edit',
  templateUrl: './profile-configuration-edit.component.html',
  styleUrls: ['./profile-configuration-edit.component.scss'],
  providers: [GroupService, ProfilePermissionService, PermissionService ],
  encapsulation: ViewEncapsulation.None
})
export class ProfileConfigurationEditComponent implements OnInit {
  public selectedPermissions: number[] = [];
  public group: Group =  new Group();
  public avaiablePermissions: Permission[] = [];
  public permissionsTranslated: Permission[] = [];

  constructor(private groupService: GroupService,
              private toast: ToastService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private router: Router,
              private pageTitleService: TitlePageService,
              private permissionService: PermissionService
              ) {}

  ngOnInit() {
    this.pageTitleService.setSubTitle('LABEL_EDIT');
    this.pageTitleService.setShowBtnRouter('configuration');
    this.retrievePermissions();
  }

  private retrieveGroup() {

    this.route.params
      .subscribe((value) => {
        const idGroup = +value['id'];
        if (idGroup) {
          this.groupService.getById(idGroup).subscribe(
            (response) => {
              const groupResponse = response;
              groupResponse.permission_list = this.translateAndOrderedByCodeNamePermissions(groupResponse.permission_list);
              this.group = groupResponse;
              this.selectedPermissions = this.group.permissions;
              this.avaiablePermissions = this.differenceSelectedPermissions();
            },
            ex => {
              this.toast.error(this.translate._('MSG_ERROR'), ex);
            });
        } else {
          this.group = new Group();
        }
      });
  }

  private differenceSelectedPermissions() {
    return this.avaiablePermissions.filter(ap => this.selectedPermissions.filter(p => ap.id === p).length === 0);
  }

  private retrievePermissions() {
    this.permissionService.getAll().subscribe(
      (response) => {
        this.avaiablePermissions = response;
        this.avaiablePermissions = this.translateAndOrderedByCodeNamePermissions(this.avaiablePermissions);
        this.retrieveGroup();
      },
      ex => {
        this.toast.error(this.translate._('MSG_ERROR'), ex);
      }
    );
  }

  private translateAndOrderedByCodeNamePermissions(permissions) {
    let permissionsTranslated = [];

    permissions.forEach((permission) => {
      const newPermission = permission;
      newPermission.codename = this.translate._(permission.codename);
      permissionsTranslated.push(newPermission);
    });
    permissionsTranslated = permissionsTranslated.sort((a, b) => {
      if (a.codename.toLowerCase() < b.codename.toLowerCase()) { return -1; }
      if (a.codename.toLowerCase() > b.codename.toLowerCase()) { return 1; }
      return 0;
    });

    return permissionsTranslated;
  }

  private gotToList() {
    this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('toast-saved-successfully'));
    this.router.navigate(['../modules/configuration']);
  }

  public saveAllPermissions(form: NgForm) {
    if (!form.valid) {
      return  this.toast.error(this.translate._('MSG_ERROR'), 'Preencher campo obrigatório');
    }
    this.group.permissions = this.group.permission_list.map(p => p.id);
    if (this.group.id) {

      this.groupService.update(this.group.id, this.group).subscribe(
        (profile) => {
          this.gotToList();
        },
        ex => {
          this.toast.error(this.translate._('MSG_ERROR'), ex);
        }
      );
    } else {
      this.groupService.save(this.group).subscribe(
        (profile) => {
          this.gotToList();
        },
        ex => {
          this.toast.error(this.translate._('MSG_ERROR'), ex);
        }
      );
    }
  }

  public selectedPermission(permission) {
    this.group.permission_list.push(permission);
    this.avaiablePermissions.splice(this.avaiablePermissions.indexOf(permission), 1);
  }

  public unselectedPermission(permission) {
    this.avaiablePermissions.push(permission);
    this.group.permission_list.splice(this.group.permission_list.indexOf(permission), 1);
  }

  addAll() {
    this.group.permission_list = this.group.permission_list.concat(this.avaiablePermissions);
    this.avaiablePermissions = [];
  }

  removeAll() {
    this.avaiablePermissions = this.avaiablePermissions.concat(this.group.permission_list);
    this.group.permission_list = [];
  }
}
