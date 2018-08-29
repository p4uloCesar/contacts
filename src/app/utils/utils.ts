
import {throwError as observableThrowError, Observable} from 'rxjs';
import {ReflectiveInjector} from '@angular/core';
import {Headers, RequestOptions, Http, HttpModule} from '@angular/http';

export class Utils {

  public static getOffset(pageIndex: number, pageSize: number): number {
    return pageSize * pageIndex;
  }

  public static loadUrl<T>(url: string): Observable<T> {
    const providers = (<any>HttpModule).decorators[0].args[0].providers;
    const injector = ReflectiveInjector.resolveAndCreate(providers);
    const http = injector.get(Http);

    return http.get(url, Utils.addOptions()).map(response => response.json() as T).catch(ex => observableThrowError(ex));
  }

  private static addOptions(): RequestOptions {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Content-Language': 'pt-br',
        'Accept-Language': 'pt-br'
      }
    );
    const options = new RequestOptions();
    if (this.getToken()) {
      headers.set('Authorization', 'Token ' + Utils.getToken());
    }
    options.headers = headers;
    return options;
  }

  private static getToken(): string {
    return localStorage.getItem('TOKEN_STORAGE');
  }
}
