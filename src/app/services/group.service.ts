
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpInterceptor} from './http-interceptor';
import {ProfilePermission} from '../models/profile-permission';
import {Group} from '../models/group';

@Injectable()
export class GroupService extends BaseService<Group> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'group/');
  }


  public updateProfilePermissions(idProfile, profilePermissions: ProfilePermission[]): Observable<ProfilePermission[]> {
    this.clearParameter();
    return this.http.put(this.fullUrl.concat( String(idProfile) + '/' + 'update_permissions/'), profilePermissions, this.addOptions(this.parameters)).map(
      response => response.json() as ProfilePermission[]
    ).catch(
      ex => observableThrowError(ex)
    );
  }

}
