import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataSeriesDialogComponent} from './data-series-dialog/data-series-dialog.component';
import {CoreModule} from '../core/core.module';
import {DataSeriesListComponent} from './data-series-list/data-series-list.component';
import {DataSeriesService} from '../../services/data-series.service';
import { LedgerListComponent } from './ledger-list/ledger-list.component';

@NgModule({
  entryComponents: [DataSeriesDialogComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [DataSeriesListComponent, DataSeriesDialogComponent, LedgerListComponent],
  providers: [DataSeriesService]
})
export class LedgerModule { }
