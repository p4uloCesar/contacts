import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLogin} from '../../../models/user-login';
import {TranslateService} from '../../../translate/translate.service';
import {ToastService} from '../../../services/toast-service';
import {AuthTokenService} from '../../../services/auth-token.service';
import {AuthTokenStorageService} from '../../../services/auth-token-storage-service';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public userLogin: UserLogin;
  public hidePassword = true;
  public isReading: boolean;

  constructor(private loginService: LoginService,
              private authService: AuthTokenService,
              private translate: TranslateService,
              private router: Router,
              protected toast: ToastService) {
    this.userLogin = new UserLogin();
  }
  public ngOnInit(): void {
    this.verifyIsLoged();
  }

  public login(): void {
    this.loginService.obtainsToken(this.userLogin).subscribe(
      response => {
        this.authService.persistUsername(this.userLogin.username);
        this.saveUserToken(response);
        this.router.navigate(['/']);
      },
      () => {
        this.toast.error(this.translate._('authentication'),
          this.translate._('MSG_USERNAME_PASSWORD_INVALID'));
      }
    );
  }

  public loginGuest(): void {
    this.loginService.obtainsTokenGuest().subscribe(
      response => {
        this.authService.persistUsername('convidado');
        this.saveUserToken(response);
        this.router.navigate(['/modules/work-instruction']);
      },
      () => {
        this.toast.error(this.translate._('authentication'),
          this.translate._('MSG_USERNAME_PASSWORD_INVALID'));
      }
    );
  }

  private saveUserToken(response) {
    this.authService.persistToken(response.token);
    this.authService.persistUserFullName(response.user.employee ? response.user.employee : '');
    this.authService.persistUsername(response.user.username);
    this.authService.persistUserId(response.user.id);
    this.authService.persistRoles(response.user.roles);
    this.authService.persistGroups(response.user.groups);
  }

  public verifyIsLoged(): void {
    const authToken: string = this.authService.hasToken();
    if (authToken) {
      this.router.navigate(['/']);
    }
  }




}
