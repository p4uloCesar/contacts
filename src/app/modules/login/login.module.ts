import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {CoreModule} from "../core/core.module";

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
