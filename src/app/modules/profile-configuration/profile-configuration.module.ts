import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileConfigurationListComponent } from './profile-configuration-list/profile-configuration-list.component';
import { ProfileConfigurationEditComponent } from './profile-configuration-edit/profile-configuration-edit.component';
import {ProfileService} from '../../services/profile-configuration.service';
import {CoreModule} from '../core/core.module';
import {GroupService} from '../../services/group.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [ProfileConfigurationListComponent, ProfileConfigurationEditComponent],
  providers: [ GroupService]
})
export class ProfileConfigurationModule {}
