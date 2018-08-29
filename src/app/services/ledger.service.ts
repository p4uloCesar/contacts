import { Injectable } from '@angular/core';
import {HttpInterceptor} from "./http-interceptor";
import {BaseService} from "./base.service";
import {Ledger} from "../models/ledger";

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService<Ledger>{

  constructor(protected http: HttpInterceptor) {
    super(http, 'ledger/');
  }}
