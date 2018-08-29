import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule, MAT_DATE_LOCALE
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '../../translate/TranslateModule';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { DialogComponent } from './dialog/dialog.component';
import { MatChipAutocompleteComponent } from './mat-chip-autocomplete/mat-chip-autocomplete.component';
import { ProfileAutocompleteComponent } from './profile-autocomplete/profile-autocomplete.component';
import { OnlyNumberDirective } from './only-number-directive/only-number.directive';
import { FooterBasicComponent } from './footer-basic/footer-basic.component';
import { ToastService } from '../../services/toast-service';
import { RolesDirective } from './roles-directive/roles.directive';
import { AuthTokenService } from '../../services/auth-token.service';
import { AuthTokenStorageService } from '../../services/auth-token-storage-service';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ShowDirective } from './show-app/show-app.directive';
import { NoWhitespaceDirective } from './no-whitespace-validator/no-whitespace-validator.directive';
import { CustomAutocompleteComponent } from './custom-autocomplete/custom-autocomplete.component';
import { FocusDirective } from './focus/focus.directive';
import { TreeModule } from 'angular-tree-component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import {TreeChildrenComponent} from "./tree-children/tree-children.component";

@NgModule({
  imports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    BrowserModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule,
    NgProgressModule,
    MatProgressBarModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    BrowserModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule,
    NgProgressModule,
    MatProgressBarModule,
    HttpModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DialogComponent,
    MatChipAutocompleteComponent,
    ProfileAutocompleteComponent,
    OnlyNumberDirective,
    FooterBasicComponent,
    RolesDirective,
    ShowDirective,
    SearchFilterComponent,
    NoWhitespaceDirective,
    CustomAutocompleteComponent,
    FocusDirective,
    TreeModule,
    BreadCrumbComponent,
    TreeChildrenComponent
  ],
  entryComponents: [DialogComponent],
  declarations: [
    DialogComponent,
    MatChipAutocompleteComponent,
    ProfileAutocompleteComponent,
    OnlyNumberDirective,
    FooterBasicComponent,
    RolesDirective,
    SearchFilterComponent,
    ShowDirective,
    NoWhitespaceDirective,
    FocusDirective,
    CustomAutocompleteComponent,
    BreadCrumbComponent,
    TreeChildrenComponent

  ],
  providers: [
    ToastService,
    AuthTokenService,
    AuthTokenStorageService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],

})
export class CoreModule { }
