import {Component, OnInit} from '@angular/core';
import {TranslateService} from '../translate/translate.service';
import {LANG_EN_NAME} from '../translate/lang-en';

import {LanguageStorageService} from '../services/language-storage.service';
import {ToastService} from '../services/toast-service';
import {TitlePageService} from '../services/title-page.service';
import { Title } from '@angular/platform-browser';
import {Router, ActivatedRoute  } from '@angular/router';
import {Location} from '@angular/common';
import {AuthTokenService} from '../services/auth-token.service';
import {isUndefined} from 'util';
import {CanActivateAuth} from '../guard/can-activate-auth';
import {AuthTokenStorageService} from '../services/auth-token-storage-service';

class MenuGroup {
  groupName: string;
  menuItem: MenuItem[] = [];
}
class MenuItem {
  path: string;
  title: string;
  isFirst: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ToastService, TitlePageService, Title],
})
export class MainComponent implements OnInit {
  public subTitle: string;
  public title: string;
  public showRouter: string;
  public menuGroup: MenuGroup[];
  public showLogoMinimized = false;
  public countSuggestion = 0;
  public countTaskPending = 0;
  public countTaskExpired = 0;
  public notifications = ['admin', 'view_suggestion'];
  public notificationsTask = ['approver_file' , 'homologator_file' , 'scribe_file','view_task'];
  public operators = ['MONTADOR', 'TESTADOR'];
  public canSearchAllNotification = false;
  public canSearchAllNotificationTask = false;
  public idUser: number;


  constructor(protected translate: TranslateService,
              private langService: LanguageStorageService,
              protected toast: ToastService,
              private pageTitleService: TitlePageService,
              private token_service: AuthTokenService,
              private router: Router,
              private _location: Location,
              private tokenService: AuthTokenService,
              private canActivateAuth: CanActivateAuth,
              private route: ActivatedRoute,) {
    if (route.snapshot.firstChild != null) {
      this.changeTitle(route.snapshot.firstChild.data.groupName);
    }
  }

  ngOnInit() {
    this.changeLanguage();

    // serviço muda o subtitle das páginas
    this.pageTitleService.subTitle.subscribe((value: string) => {
      this.subTitle = value;
    });
    // serviço muda o subtitle das páginas
    this.pageTitleService.showBtnRouter.subscribe((value: string) => {
      setTimeout(() => this.showRouter = value);
    });

    window.addEventListener('storage', (event) => {
      if (!document.hasFocus() && event.key === AuthTokenStorageService.TOKEN_STORAGE && !this.tokenService.hasToken()) {
        this.logOut();
      }
    }, false);
    this.generateMenu();

  }

  public isOperator(): boolean {
    return this.canActivateAuth.containsGroups(this.operators);
  }

  public generateMenu() {
    this.menuGroup = this.getMenuItems();
  }

  backClicked() {
    this._location.back();
  }

  public openSidenav(sidenav, closeEvent) {
    if (!sidenav.opened && this.showLogoMinimized && closeEvent) {
      return;
    }

    this.showLogoMinimized = !this.showLogoMinimized;
    if (this.showLogoMinimized) {
      sidenav.close();
    } else {
      sidenav.open();
    }
  }

  public changeLanguage(): void {
    this.langService.setLanguage(LANG_EN_NAME);
  }

  getMenuItems(): MenuGroup[] {
    const routers = this.router.config[1].children
      .filter(route => route.data && route.data.title);
    const menuList: MenuGroup[] = [];
    for (const router of routers) {
      const  contains = this.canActivateAuth.containsRoles(router.data.roles);
       if (!contains) {
         continue;
       }
       if (router.data.visible !== undefined && !router.data.visible) {
         continue;
       }
       let menuGroup = menuList.find(menu => menu.groupName === router.data.groupName);
       if (isUndefined(menuGroup)) {
         menuGroup = new MenuGroup();
         menuGroup.groupName = router.data.groupName;
         menuList.push(menuGroup);
       }
       const menuItem = new MenuItem();
       menuItem.path = router.path;
       menuItem.title = router.data.title;
       menuItem.isFirst = router.data.isFirst;
       menuGroup.menuItem.push(menuItem);
    }
    return menuList;
  }

  public changeTitle(title: string): void {
    this.title = this.translate._(title);
  }

  public getUserName(): string {
    const userFullName = this.tokenService.getUserFullName() ? this.tokenService.getUserFullName() : this.tokenService.getUser();
    const simpleName = userFullName.split(' ')[0];

    return simpleName.toUpperCase();
  }
  public  logOut() {
    this.tokenService.invalidate();
    this.router.navigate(['/username']);
  }
  public validateNotification(): boolean {
    return this.canSearchAllNotification = this.canActivateAuth.containsRoles(this.notifications);
  }
  public validateNotificationTask(): boolean {
    return this.canSearchAllNotificationTask = this.canActivateAuth.containsRoles(this.notificationsTask);
  }

}
