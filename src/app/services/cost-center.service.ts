import { Injectable } from '@angular/core';
import {HttpInterceptor} from "./http-interceptor";
import {User} from "../models/user";
import {BaseService} from "./base.service";
import {CostCenter} from "../models/cost-center";

@Injectable({
  providedIn: 'root'
})
export class CostCenterService extends BaseService<CostCenter>{

  constructor(protected http: HttpInterceptor) {
    super(http, 'costcenter/');
  }


}
