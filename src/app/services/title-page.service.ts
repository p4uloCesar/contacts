import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class TitlePageService {
  public subTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public showBtnRouter: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public updateNotification: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  // notifies task pending GED
  public updateNotificationTask: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  // notifies task expired GED
  public updateNotificationExpiredTask: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  setSubTitle(value: string) {
    this.subTitle.next(value);
  }
  setShowBtnRouter(showBtnBack: string) {
    this.showBtnRouter.next(showBtnBack);
  }
  setNotification(count: number) {
    this.updateNotification.next(count);
  }

  // send the task pending
  setNotificationTask(count: number) {
    this.updateNotificationTask.next(count);
  }

  // send the task expired
  setNotificationExpiredTask(count: number) {
    this.updateNotificationExpiredTask.next(count);
  }
}
