import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
