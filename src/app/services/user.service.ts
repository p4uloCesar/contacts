
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpInterceptor} from './http-interceptor';
import {User} from '../models/user';

@Injectable()
export class UserService extends BaseService<User> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'user/');
  }
  public getUserByRegister(): Observable<User> {
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
      response => response.json() as any
    ).catch(
      ex => observableThrowError(ex)
    );
  }

}
