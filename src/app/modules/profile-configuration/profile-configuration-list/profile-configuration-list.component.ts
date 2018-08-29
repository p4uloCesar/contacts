import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TitlePageService} from '../../../services/title-page.service';
import {Profile} from '../../../models/profile-configuration';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Utils} from '../../../utils/utils';
import {TranslateService} from '../../../translate/translate.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastService} from '../../../services/toast-service';
import {DialogComponent} from '../../core/dialog/dialog.component';
import {GroupService} from '../../../services/group.service';
import {Group} from '../../../models/group';
import {BaseListComponent} from '../../core/base-list.component';

@Component({
  selector: 'app-profile-configuration-list',
  templateUrl: './profile-configuration-list.component.html',
  styleUrls: ['./profile-configuration-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileConfigurationListComponent extends BaseListComponent implements OnInit, AfterViewInit {
  public isSpinner: boolean;
  dataSource: MatTableDataSource<Group> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  profileConfi: Group[];
  descriptionFilter: String;

  constructor(public dialog: MatDialog,
              private service: GroupService,
              private toast: ToastService,
              private translate: TranslateService,
              private pageTitleService: TitlePageService) {
    super();
  }

  ngOnInit() {
    this.sort.direction = 'asc';
    this.sort.active = 'description';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [10, 20, 30, 40, 50];
    this.pageTitleService.setSubTitle('PROFILE_CONFIGURATION');
    this.pageTitleService.setShowBtnRouter('');
    this.isSpinner = true;

  }

  ngAfterViewInit() {
    this.retrieveList();
  }

  public search() {
    this.retrieveList();
  }

  public retrieveList(): void {
    let caracterOrder = '';
    if (this.sort.direction === 'desc') {
      caracterOrder = '-';
    }

    this.service.clearParameter();
    this.service.addParameter('limit', String(this.paginator.pageSize));
    this.service.addParameter('ordering', String(`$(caracterOrder)$(this.sort.active)`));
    this.service.addParameter('offset',
      String(Utils.getOffset(this.paginator.pageIndex, this.paginator.pageSize))
    );
    if (this.descriptionFilter) {
      this.service.addParameter('name', String(this.descriptionFilter));
    }

    this.service.getPaginated().subscribe(
      response => {
        this.profileConfi = response.results;
        this.paginator.length = response.count;
        this.dataSource = new MatTableDataSource(this.profileConfi);
        this.dataSource.sort = this.sort;
        this.isSpinner = false;
      },
      ex => {
      }
    );
  }


  public delete(profile: Profile): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {id: profile.id, description: this.translate._('MSG_CONFIRM_REMOVE')}

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'data' ) {
        this.service.delete(profile.id).subscribe(
          (response) => {
            this.toast.success(this.translate._('MSG_SUCCESS'), this.translate._('MSG_SUCCESS_DELETE'));
            this.retrieveList();
          },
          ex => {
          });

      }

    });
  }
}
