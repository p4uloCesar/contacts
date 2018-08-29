import {BehaviorSubject} from 'rxjs';

export class GenericDataBase <T> {
  public dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public get data(): T[] {
    return this.dataChange.value;
  }

  public updateValues(resultSet: T[]) {
    this.dataChange.next(resultSet);
  }

}
