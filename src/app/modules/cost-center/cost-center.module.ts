import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from "../core/core.module";
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';
import {TreeChildrenComponent} from "../core/tree-children/tree-children.component";

@NgModule({
  imports: [
    CoreModule,
    CommonModule
  ],
  declarations: [CostCenterListComponent],

})
export class CostCenterModule { }
