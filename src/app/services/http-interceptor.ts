
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// operators



import {ToastService} from './toast-service';
import {TranslateService} from '../translate/translate.service';
import {AuthTokenService} from './auth-token.service';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: XHRBackend,
    options: RequestOptions, private toast: ToastService,
    private translate: TranslateService,
    public http: Http,
    private authTokenService: AuthTokenService,
    private router: Router
  ) {
    super(backend, options);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch(this.handleError);
  }

  public handleError = (error: any) => {
    if (error.status === 0 ) {
      this.toast.error(this.translate._('MSG_ERROR'), this.translate._('error-message-connection') );
      return Observable.empty();
    } else if (error.status === 404 ) {
      this.toast.error(this.translate._('MSG_ERROR'),  this.translate._('error-message-not-found'));
      return Observable.empty();
    } if (error.status === 409 ) {
      this.toast.error(this.translate._('MSG_ERROR'),  this.translate._(error.json().detail));
      return Observable.empty();
    } else if (error.status === 401 ) {
      this.toast.error(this.translate._('MSG_ERROR'),  this.translate._('toast-token-expired'));
      this.goToLogin();
      return Observable.empty();
    } else if (error.status === 412 ) {
      this.toast.error(this.translate._('MSG_ATTENTION'),  this.translate._(error.json().detail));
      return Observable.empty();
    } else if (error.status === 413 ) {
      this.toast.error(this.translate._('MSG_ATTENTION'),  this.translate._(error.json().detail));
      return Observable.empty();
    }else if (error.status === 500 ) {
      this.toast.error(this.translate._('MSG_ATTENTION'), this.translate._('error-message-connection'));
      return Observable.empty();
    } else {
      return Observable.throw(error);
    }
  }


  private goToLogin(): void {
    this.authTokenService.invalidate();
    this.router.navigate(['/username']);
  }

}
