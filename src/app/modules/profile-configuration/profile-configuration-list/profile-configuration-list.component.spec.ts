import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ToolService} from '../../../services/tool.service';
import {Utils} from '../../../utils/utils';
import {ToastService} from '../../../services/toast-service';
import {TranslateService} from '../../../translate/translate.service';
import {DialogComponent} from '../../core/dialog/dialog.component';
/*
import { ProfileConfigurationListComponent } from './group-configuration-list.component';

describe('ProfileConfigurationListComponent', () => {
  let component: ProfileConfigurationListComponent;
  let fixture: ComponentFixture<ProfileConfigurationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConfigurationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/
