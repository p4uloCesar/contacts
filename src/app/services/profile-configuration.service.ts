import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Http} from '@angular/http';
import {Profile} from '../models/profile-configuration';
import {HttpInterceptor} from './http-interceptor';

@Injectable()
export class ProfileService extends BaseService<Profile> {

  constructor(protected http: HttpInterceptor) {
    super(http, 'group/');
  }

}
