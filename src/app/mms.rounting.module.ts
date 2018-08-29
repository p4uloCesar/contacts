import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';


import { ProfileConfigurationListComponent } from './modules/profile-configuration/profile-configuration-list/profile-configuration-list.component';
import {ProfileConfigurationEditComponent} from './modules/profile-configuration/profile-configuration-edit/profile-configuration-edit.component';
import {EmployeeListComponent} from './modules/employee/employee-list/employee-list.component';

import {CanActivateAuth} from './guard/can-activate-auth';
import {CanActivateLoginGuard} from './guard/can-activate-login.guard';

import {LoginComponent} from './modules/login/login/login.component';
import {HomeComponent} from './modules/home/home/home.component';
import {EmployeeEditComponent} from './modules/employee/employee-edit/employee-edit.component';
import {DataSeriesListComponent} from './modules/ledger/data-series-list/data-series-list.component';
import {CostCenterListComponent} from "./modules/cost-center/cost-center-list/cost-center-list.component";
import {LedgerListComponent} from "./modules/ledger/ledger-list/ledger-list.component";



const routes: Routes = [
  {
    canActivate: [CanActivateLoginGuard],
    path: 'username', component: LoginComponent
  },
  {
    path: '',
    canActivate: [CanActivateAuth],
    canActivateChild: [CanActivateAuth],
    component: MainComponent,
    children: [
      {path: '', component: HomeComponent,
        data: {
          title: '',
          groupName: 'TITLE_HOME',
        }
      },
      {path: 'employee', component: EmployeeListComponent,
        data: {
          title: 'EMPLOYEE_TITLE_LIST',
          groupName: 'TITLE_BASIC_DATA',
          roles : ['admin', 'view_employee']
        }
      },
      {path: 'employee/:id', component: EmployeeEditComponent,
        data: {
          roles : ['admin', 'view_employee']
        }
      },


      {path: 'configuration', component: ProfileConfigurationListComponent, pathMatch: 'full',
        data: {
          groupName: 'TITLE_CONFIGURATION',
          title: 'PROFILE_CONFIGURATION',
          roles : ['admin', 'view_profile']
        }
      },
      {path: 'configuration/:id', component: ProfileConfigurationEditComponent ,
        data: {
          roles : ['admin', 'view_profile']
        }
      },

      {path: 'ledgerdataseries', component: DataSeriesListComponent ,
        data: {
          groupName: 'TITLE_BASIC_FINANCIAL',
          title: 'ACTUAL_EXPENSES',
          roles : ['admin', 'view_profile']
        }
      },
      {path: 'ledger/:id', component: LedgerListComponent,
        data: {
          roles : ['admin']
        }
      },
      {path: 'costcenter/:id', component: CostCenterListComponent,
        data: {
          groupName: 'TITLE_BASIC_FINANCIAL',
          roles : ['admin']
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class MMStRoutingModule {
}
