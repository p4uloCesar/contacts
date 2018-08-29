import {Injectable, Inject} from '@angular/core';

@Injectable()
export class AuthTokenStorageService {
  public static TOKEN_STORAGE = 'TOKEN_STORAGE';
  private static USER_STORAGE = 'USER_STORAGE';
  private static USER_ID_STORAGE = 'USER_ID_STORAGE';
  private static USER_FULL_NAME_STORAGE = 'USER_FULL_NAME_STORAGE';
  private static USER_GROUPS = 'USER_GROUPS';
  private static ROLES = 'ROLES';
  private static TEMP_ROLES = 'TEMP_ROLES';
  constructor(@Inject('Window') private _window: Window) {
  }
  public setToken(authToken: string): void {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.TOKEN_STORAGE, authToken);
    }
  }
  public setUsername(username: string): void {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.USER_STORAGE, username);
    }
  }
  public setUserId(userId: string): void {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.USER_ID_STORAGE, userId);
    }
  }
  public setUserFullName(userFullName: string): void {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.USER_FULL_NAME_STORAGE, userFullName);
    }
  }
  public getGroups(): string [] {
    if (!this._window.localStorage) {
      return null;
    }
    let groups = [];
    try {
      const user_groups = this._window.localStorage.getItem(AuthTokenStorageService.USER_GROUPS);
      if (user_groups) {
        groups = user_groups.split(',');
      }
    } finally {
      if (!groups) {
        this.invalidate();
      }
    }
    return groups;
  }
  public setGroups(groups: any) {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.USER_GROUPS, groups);
    }
  }
  public getRoles(): string [] {
    if (!this._window.localStorage) {
      return null;
    }
    let permissions: any;
    try {
      permissions = this._window.localStorage.getItem(AuthTokenStorageService.ROLES).split(',');
    } finally {
      if (!permissions) {
        this.invalidate();
      }
    }
    return permissions;
  }
  public setRoles(roles: any) {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.ROLES, roles);
    }
  }
  public setTempRoles(roles: any) {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.TEMP_ROLES, roles);
    }
  }
  public isTempRolesEmpty() {
    if (this._window.localStorage) {
      return this._window.localStorage.getItem(AuthTokenStorageService.TEMP_ROLES) == '';
    } else {
      return false;
    }
  }
  public copyRolesToTempRoles() {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(AuthTokenStorageService.TEMP_ROLES, this._window.localStorage.getItem(AuthTokenStorageService.ROLES));
    }
  }
  public restoreOriginalRoles() {
    if (this._window.localStorage && this._window.localStorage.getItem(AuthTokenStorageService.TEMP_ROLES) && this._window.localStorage.getItem(AuthTokenStorageService.TEMP_ROLES).length > 0) {
      this._window.localStorage.setItem(AuthTokenStorageService.ROLES, this._window.localStorage.getItem(AuthTokenStorageService.TEMP_ROLES));
    }
  }
  public getToken(): string {
    if (!this._window.localStorage) {
      return null;
    }
    let authToken: string;
    try {
      authToken = this._window.localStorage.getItem(AuthTokenStorageService.TOKEN_STORAGE);
    } finally {
      if (!authToken) {
        this.invalidate();
      }
    }
    return authToken;
  }
  public getUser(): string {
    if (!this._window.localStorage) {
      return null;
    }
    let username: string;
    try {
      username = this._window.localStorage.getItem(AuthTokenStorageService.USER_STORAGE);
    } finally {
      if (!username) {
        this.invalidate();
      }
    }
    return username;
  }

  public getUserFullName(): string {
    if (!this._window.localStorage) {
      return null;
    }
    let fullName: string;
    try {
      fullName = this._window.localStorage.getItem(AuthTokenStorageService.USER_FULL_NAME_STORAGE);
    } finally {

    }

    return fullName;
  }

  public getUserId(): number {
    if (!this._window.localStorage) {
      return null;
    }
    let user_id: string;
    try {
      user_id = this._window.localStorage.getItem(AuthTokenStorageService.USER_ID_STORAGE);
    } finally {
      if (!user_id) {
        this.invalidate();
      }
    }
    return +user_id;
  }

  public invalidate(): void {
    if (this._window.localStorage) {
      this._window.localStorage.removeItem(AuthTokenStorageService.TOKEN_STORAGE);
      this._window.localStorage.removeItem(AuthTokenStorageService.USER_STORAGE);
      this._window.localStorage.removeItem(AuthTokenStorageService.USER_GROUPS);
      this._window.localStorage.removeItem(AuthTokenStorageService.USER_ID_STORAGE);
      this._window.localStorage.removeItem(AuthTokenStorageService.USER_FULL_NAME_STORAGE);
      this._window.localStorage.removeItem(AuthTokenStorageService.ROLES);
      this._window.localStorage.removeItem(AuthTokenStorageService.TEMP_ROLES);
    }
  }
}
