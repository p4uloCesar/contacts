
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthTokenService} from '../services/auth-token.service';
import {ToastService} from '../services/toast-service';

// I have this service , you can use your one

@Injectable()
export class CanActivateAuth implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthTokenService,
    private router: Router,
    private toastService: ToastService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const roles_route: string[] = route.data.roles;

    if (this.authService.hasToken() ) {
      const contains = this.containsRoles(roles_route);
      if (!contains) {
        this.toastService.error('Erro', 'Sem permissão de acesso.');
      }
      return contains;
    }

    this.router.navigate(['/username']);
    return false;
  }


  public containsRoles( roles_route: string[]) {
    const roles: string[] = this.authService.getRoles();
    let contains = true;
    if (roles_route !== undefined) {
      contains =  false;
      for (const role of  roles_route) {
        if (roles.indexOf(role) > -1) {
          contains = true;
          break;
        }
      }
    }
    return contains;
  }

  public containsGroups( groups_route: string[]) {
    const groups: string[] = this.authService.getGroups();
    let contains = false;
    if (groups_route !== undefined) {
      for (const group of  groups_route) {
        if (groups.indexOf(group) > -1) {
          contains = true;
          break;
        }
      }
    }
    return contains;
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.canActivate(route);
  }

}
