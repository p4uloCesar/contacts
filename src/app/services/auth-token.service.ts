import { Injectable } from '@angular/core';
import {AuthTokenStorageService} from './auth-token-storage-service';

@Injectable()
export class AuthTokenService {

  constructor( private authTokenStorageService: AuthTokenStorageService) {

  }
  public hasToken(): string {
    return this.authTokenStorageService.getToken();
  }
  public admigetToken(): string {
    return this.authTokenStorageService.getToken();
  }
  public getUser(): string {
    return this.authTokenStorageService.getUser();
  }
  public getUserFullName(): string {
    return this.authTokenStorageService.getUserFullName();
  }
  public getUserId(): number {
    return this.authTokenStorageService.getUserId();
  }
  public persistToken(authToken: string): void {
    return this.authTokenStorageService.setToken(authToken);
  }
  public persistUsername(username: string): void {
    return this.authTokenStorageService.setUsername(username);
  }
  public persistUserId(id_user: any) {
    return this.authTokenStorageService.setUserId(id_user);
  }
  public persistUserFullName(userFullName: string) {
    return this.authTokenStorageService.setUserFullName(userFullName);
  }
  public invalidate(): void {
    return this.authTokenStorageService.invalidate();
  }
  public persistGroups(groups: any) {
    return this.authTokenStorageService.setGroups(groups);
  }
  public persistRoles(permissions: any) {
    return this.authTokenStorageService.setRoles(permissions);
  }
  public clearRoles() {
    this.authTokenStorageService.setRoles('');
  }
  public clearTempRoles() {
    this.authTokenStorageService.setTempRoles('');
  }
  public persistTempRoles() {
    return this.authTokenStorageService.copyRolesToTempRoles();
  }
  public restoreOriginalRoles() {
    return this.authTokenStorageService.restoreOriginalRoles();
  }
  public isTempRolesEmpty() {
    return this.authTokenStorageService.isTempRolesEmpty();
  }
  public getRoles(): string[] {
    return this.authTokenStorageService.getRoles();
  }
  public getGroups(): string[] {
    return this.authTokenStorageService.getGroups();
  }
}
