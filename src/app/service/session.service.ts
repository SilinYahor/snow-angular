import { Injectable } from '@angular/core';
import {User} from "../entity/User";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private http: HttpClient;
  private errorService: ErrorService;
  private user: User;

  private TOKEN_KEY = 'token';
  private TOKEN_BY_DEFAULT = 'no_token';

  private ADMIN_ROLE_ID = 1;
  private MEMBER_ROLE_ID = 2;

  private subscription: Subscription;

  constructor(http: HttpClient,
              errorService: ErrorService) {
    this.http = http;
    this.errorService = errorService;
    this.connectAndFindUser();
  }

  connectAndFindUser() : Observable<User> {
    this.ping();

    let token = this.getToken();
    let url = 'http://localhost:8080/users/token/' + token;
    let observable = this.http.get<User>(url)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );

    if (this.subscription)
      this.subscription.unsubscribe();
    this.subscription = observable.subscribe(result => {
      this.user = result;
    });

    return observable;
  }

  getUser() : User {
    return this.user;
  }

  resetUser() {
    this.user = null;
  }

  isCurrentUserAuthorized() : boolean {
    return !!this.user;
  }

  isCurrentUserAdmin() : boolean {
    if (!this.isCurrentUserAuthorized())
      return false;
    return this.user.role.id == this.ADMIN_ROLE_ID;
  }

  isCurrentUserMember() : boolean {
    if (!this.isCurrentUserAuthorized())
      return false;
    return this.user.role.id == this.MEMBER_ROLE_ID;
  }

  saveTokenToLocalStorage(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.connectAndFindUser();
  }

  saveTokenToSessionStorage(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
    this.connectAndFindUser();
  }

  saveTokenWithRememberMe(token: string, rememberMe: boolean) {
    this.saveTokenToSessionStorage(token);

    if (rememberMe) {
      this.saveTokenToLocalStorage(token);
    }
  }

  updateTokenWhereItWasSet(token: string) {
    if (this.getTokenFromSessionStorage() != this.TOKEN_BY_DEFAULT) {
      this.saveTokenToSessionStorage(token);
    }
    if (this.getTokenFromLocalStorage() != this.TOKEN_BY_DEFAULT) {
      this.saveTokenToLocalStorage(token);
    }
  }

  private getTokenFromLocalStorage() : string {
    let token = localStorage.getItem(this.TOKEN_KEY);
    return token ? token : this.TOKEN_BY_DEFAULT;
  }

  private getTokenFromSessionStorage() : string {
    let token = sessionStorage.getItem(this.TOKEN_KEY);
    return token ? token : this.TOKEN_BY_DEFAULT;
  }

  getToken() : string {
    let token = this.getTokenFromSessionStorage();
    if (this.isTokenPresent(token)) {
      return token;
    }
    token = this.getTokenFromLocalStorage();
    if (this.isTokenPresent(token)) {
      this.saveTokenToSessionStorage(token);
      return token;
    }
    return this.TOKEN_BY_DEFAULT;
  }

  private isTokenPresent(token: string) : boolean {
    return <boolean>(token && token != this.TOKEN_BY_DEFAULT);
  }

  removeTokenFromLocalStorage() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.ping();
  }

  removeTokenFromSessionStorage() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.ping();
  }

  removeTokenFromEverywhere() {
    this.removeTokenFromSessionStorage();
    this.removeTokenFromLocalStorage();
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

  private ping() {
    console.log('sessionStorage: ' + sessionStorage.getItem(this.TOKEN_KEY));
    console.log('localStorage: ' + localStorage.getItem(this.TOKEN_KEY));
    console.log('user: ' + JSON.stringify(this.user));
  }
}
