import {GenericDataBase} from './generic-data-base';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';

export class GenericDataSource<T> extends DataSource<T> {
  constructor(private dataBase: GenericDataBase<T>) {
    super();
  }

  public connect(): Observable<T[]> {
    return this.dataBase.dataChange;
  }

  public disconnect() {
  }
}
