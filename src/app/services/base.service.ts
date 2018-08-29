import {Injectable} from '@angular/core';
import {Headers, URLSearchParams, RequestOptions, Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';


import {PaginatedResult} from '../utils/paginated-result';
import {HttpInterceptor} from './http-interceptor';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';


@Injectable()
export class BaseService<T> {
  protected protocol: string = location.protocol;
  protected hostname: string = location.hostname;
  private api = environment.api;
  protected headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Content-Language': 'pt-br',
      'Accept-Language': 'pt-br',
    }
  );
  protected urlBase: string;
  protected parameters: URLSearchParams;
  protected fullUrl: string;

  constructor(protected http: HttpInterceptor, path: string ) {
    this.urlBase = this.getUrlBase();
    this.parameters = new URLSearchParams();
    this.fullUrl = this.urlBase.concat(path);
  }

  public getUrlBase(): string {
    return this.protocol.concat('//').concat(this.hostname).concat(this.api);
  }

  public clearParameter(): void {
    this.parameters = new URLSearchParams();
  }

  public addParameter(key: string, value: string): void {
    this.parameters.set(key, value);
  }

  public getToken(): string {
    return localStorage.getItem('TOKEN_STORAGE');
  }

  protected addOptions(parameters?: URLSearchParams): RequestOptions {
    const options = new RequestOptions();

    if (this.getToken()) {
      this.headers.set('Authorization', 'Token ' + this.getToken());
    }

    options.headers = this.headers;
    if (parameters) {
      options.params = parameters;
    }

    return options;
  }

  public getAll(): Observable<T[]> {
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
      response => response.json() as T[]
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public getPaginated(): Observable<PaginatedResult<T>> {
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).map(
      response => response.json() as any).catch(
      ex => Observable.throw(ex)
    );

  }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    return this.http.post(this.fullUrl, entity, this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public getById(id: number): Observable<T> {
    return this.http.get(this.fullUrl.concat(String(id) + '/'), this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public delete(id: number): any {
    this.clearParameter();
    return this.http.delete(this.fullUrl.concat(String(id) + '/'), this.addOptions(this.parameters)).map(
      response => {
        return response.json();
      }
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public update(id: number, body: any): Observable<T> {
    this.clearParameter();
    return this.http.patch(this.fullUrl.concat(String(id) + '/'), body, this.addOptions(this.parameters)).map(
      response => response.json() as T
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public downloadFile(data, file_name: string, extension: string): void {
    const url = URL.createObjectURL(new Blob([data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = file_name.concat('.').concat(extension);
    a.target = '_blank';
    a.click();
    a.remove();
  }

  public saveAll(entity: T[]): Observable<T[]> {
    this.clearParameter();
    return this.http.post(this.fullUrl, entity, this.addOptions(this.parameters)).map(
      response => response.json() as T[]
    ).catch(
      ex => Observable.throw(ex)
    );
  }

  public getFileUploader(): FileUploader {
    return new FileUploader(  {headers: [ {name: 'Authorization', value: 'Token ' + this.getToken()}] } );
  }
}
