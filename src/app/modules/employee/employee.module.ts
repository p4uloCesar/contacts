import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {CoreModule} from '../core/core.module';
import {EmployeeService} from '../../services/employee.service';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { GroupAddRemoveComponent } from './group-add-remove/group-add-remove.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule],
  declarations: [EmployeeListComponent, EmployeeEditComponent, GroupAddRemoveComponent],
  providers: [EmployeeService]
})


export class EmployeeModule { }
