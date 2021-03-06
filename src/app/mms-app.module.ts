import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DragDropConfig, DragDropService, DragDropSortableService} from '~/../ng2-dnd';
import {NotificationsService} from 'angular2-notifications';
import {NgProgressBrowserXhr} from 'ngx-progressbar';
import { BrowserXhr,  } from '@angular/http';
import {HttpInterceptor} from './services/http-interceptor';
import {CoreModule} from './modules/core/core.module';
import { ProfileConfigurationModule } from './modules/profile-configuration/profile-configuration.module';
import {EmployeeModule} from './modules/employee/employee.module';

import {LoginModule} from './modules/login/login.module';
import {CanActivateAuth} from './guard/can-activate-auth';
import {AuthTokenService} from './services/auth-token.service';
import {AuthTokenStorageService} from './services/auth-token-storage-service';
import {CanActivateLoginGuard} from './guard/can-activate-login.guard';

import {HomeModule} from './modules/home/home.module';
import {MMStRoutingModule} from './mms.rounting.module';
import {LedgerModule} from './modules/ledger/ledger.module';
import {CostCenterModule} from "./modules/cost-center/cost-center.module";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    CoreModule,
    HomeModule,
    ProfileConfigurationModule,
    EmployeeModule,
    LoginModule,
    MMStRoutingModule,
    LedgerModule,
    CostCenterModule
  ],
  providers: [
    AuthTokenService,
    AuthTokenStorageService,
    CanActivateAuth,
    CanActivateLoginGuard,
    HttpInterceptor,
    NotificationsService,
    DragDropService,
    DragDropSortableService,
    DragDropConfig,
    {
      provide: 'Window',
      useValue: window
    },
    {
      provide: BrowserXhr,
      useClass: NgProgressBrowserXhr
    }
  ],
  bootstrap: [AppComponent]
})
export class MmsAppModule {

}
