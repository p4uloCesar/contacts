import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpInterceptor} from './http-interceptor';
import {DataSeries} from '../models/data-series';

import {Observable} from 'rxjs';
import {RequestOptions, Headers} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataSeriesService  extends BaseService<DataSeries>{

  constructor(protected http: HttpInterceptor) {
    super(http, 'ledgerdataseries/');
  }

  public saveWithFile(data: DataSeries) {
    this.clearParameter();
    const formData: FormData = new FormData();
    formData.append('description', data.description);
    formData.append('original_file', data.original_file);
    formData.append('period', data.period);
    const header = new Headers();
    header.append('Accept', 'application/json');
    header.set('Authorization', 'Token ' + super.getToken());
    const options = new RequestOptions();
    options.headers = header;
    return this.http.post(this.fullUrl, formData, options).map(
      response => response.json() as DataSeries
    ).catch(
      ex =>  Observable.throw(ex)
    );
  }

  public updateWithFile(id: number, formData: any) {
    this.clearParameter();
    return this.http.patch(this.fullUrl.concat(String(id) + '/'), formData, this.addOptions(this.parameters)).map(
      response => response.json() as DataSeries
    ).catch(
      ex => Observable.throw(ex)
    );
  }
}
