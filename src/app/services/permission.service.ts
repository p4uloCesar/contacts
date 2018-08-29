import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpInterceptor} from './http-interceptor';
import {Permission} from "../models/permission";

@Injectable()
export class PermissionService extends BaseService<Permission> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'permission/');
  }

}
