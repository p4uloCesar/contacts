
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Headers,  RequestOptions} from '@angular/http';
import {Employee} from '../models/employee';
import {HttpInterceptor} from './http-interceptor';



@Injectable()
export class EmployeeService extends BaseService<Employee> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'employee/');
  }

  public importEmplyees(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.set('Authorization', 'Token ' + super.getToken());
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post(this.fullUrl + 'imports/', formData, options)
      .map(response => <any>response)
      .catch(response => observableThrowError(response));
  }

  public getEmployeeUsers(): Observable<Employee[]> {
    this.clearParameter();
    return this.http.get(this.fullUrl + 'get_employee/', this.addOptions(this.parameters)).map(
      response => response.json() as Employee[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }
  public getEmployeeLeaders(): Observable<Employee[]> {
    this.clearParameter();
    return this.http.get(this.fullUrl + 'get_production_leaders/', this.addOptions(this.parameters)).map(
      response => response.json() as Employee[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }

  public getListDepEmployee(): Observable<Employee[]> {
    this.clearParameter();
    return this.http.get(this.fullUrl + 'get_list_employee_department/').map(
      response => response.json() as Employee[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }

  public getURLToUploadEmployee(id: number): string {
    return this.urlBase + 'employee/' + id + '/upload_signature/';
  }


  public getEmployeeByGroup(id_group: any): Observable<Employee[]> {
    this.clearParameter();
    this.parameters.append('group', id_group);
    return this.http.get(this.fullUrl + 'get_employees_by_group/', this.addOptions(this.parameters)).map(
      response => response.json() as Employee[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }
}
