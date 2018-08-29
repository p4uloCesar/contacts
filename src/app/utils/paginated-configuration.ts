import {MatPaginator, MatPaginatorIntl} from '@angular/material';
import {ChangeDetectorRef} from '@angular/core';

export class PaginatedConfiguration extends MatPaginator {

  constructor(_intl: MatPaginatorIntl, _changeDetectorRef: ChangeDetectorRef) {
    super(_intl, _changeDetectorRef);
    this.pageIndex = 0;
    this.pageSize = 10;
    this.pageSizeOptions = [10, 20, 30, 40, 50];
  }

}
