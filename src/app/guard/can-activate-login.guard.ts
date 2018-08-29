import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthTokenService} from '../services/auth-token.service';

@Injectable()
export class CanActivateLoginGuard implements CanActivate {

  constructor(
    private authService: AuthTokenService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.hasToken()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }


}
