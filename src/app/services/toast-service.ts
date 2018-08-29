import {NotificationsService} from 'angular2-notifications';
import {Injectable} from '@angular/core';

@Injectable()
export class ToastService {
  public options = {
    position: ['top', 'right'],
    timeOut: 3500,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'scale',
    preventDuplicates: true
  };

  constructor(private _service: NotificationsService) {
  }

  success(title: string, content: string) {

    this._service.success(
      title,
      content,
      this.options
    );
  }

  error(title: string, content: string) {
    this._service.error(
      title,
      content,
      this.options
    );
  }

  warning(title: string, content: string) {
    this._service.warn(
      title,
      content,
      this.options
    );
  }

  info(title: string, content: string) {
    this._service.info(
      title,
      content,
      this.options
    );
  }

}
