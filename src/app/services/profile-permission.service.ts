
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpInterceptor} from './http-interceptor';
import {ProfilePermission} from '../models/profile-permission';

@Injectable()
export class ProfilePermissionService extends BaseService<ProfilePermission> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'profile_permission/');
  }



  public getProfilePermissionByProfile(id: number): Observable<ProfilePermission[]> {
    this.clearParameter();
    this.addParameter('profile', id.toString());
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
      response => response.json() as ProfilePermission[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }



}
