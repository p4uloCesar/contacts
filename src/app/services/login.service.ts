
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Http} from '@angular/http';
import {Token} from '@angular/compiler';

import {User} from '../models/user';
import {HttpInterceptor} from './http-interceptor';
import {UserLogin} from '../models/user-login';
import {AuthToken} from '../models/auth-token';

@Injectable()
export class LoginService extends BaseService<AuthToken> {
  constructor(protected http: HttpInterceptor) {
    super(http, 'api-token-auth/');
  }


  public login(userLogin: UserLogin): Observable<Token> {
    return this.http.post(this.fullUrl, userLogin, this.addOptions()).map(
      response => response.json() as Token
    ).catch(ex => observableThrowError(ex));
  }


  public obtainsToken(user: UserLogin): Observable<any> {
    return this.http.post(this.fullUrl, user, this.addOptions(this.parameters)).map(
      response => response.json() as AuthToken
    ).catch(
      ex => observableThrowError(ex)
    );
  }

  public obtainsTokenGuest(): Observable<any> {
    const user = new UserLogin();
    user.username = 'convidado';
    user.password = 'empresa@1212convidado';
    return this.http.post(this.fullUrl, user, this.addOptions(this.parameters)).map(
      response => response.json() as AuthToken
    ).catch(
      ex => observableThrowError(ex)
    );
  }

}
