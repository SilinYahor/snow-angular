import { Injectable } from '@angular/core';
import {ErrorService} from "./error.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {User} from "../entity/User";
import {AuthorizeResult} from "../additional/AuthorizeResult";
import {SessionService} from "./session.service";
import {LoginData} from "../additional/LoginData";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient;
  private errorService: ErrorService;
  private sessionService: SessionService;

  constructor(http: HttpClient,
              errorService: ErrorService,
              sessionService: SessionService) {
    this.http = http;
    this.errorService = errorService;
    this.sessionService = sessionService;
  }

  getAll() : Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users')
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  getUserById(id: number) : Observable<User> {
    return this.http.get<User>('http://localhost:8080/users/id/' + id)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  register(user: User) : Observable<AuthorizeResult> {
    return this.http.post<AuthorizeResult>('http://localhost:8080/register', user)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          console.log("tap worked");
          if (result.success) {
            this.sessionService.saveTokenToSessionStorage(result.token);
          }
        })
      )
  }

  login(login: string, password: string, rememberMe: boolean) : Observable<AuthorizeResult> {
    let loginData = new LoginData(login, password);

    return this.http.post<AuthorizeResult>('http://localhost:8080/login', loginData)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          console.log("tap worked");
          if (result.success) {
            this.sessionService.saveTokenWithRememberMe(result.token, rememberMe);
          }
        })
      )
  }

  logOut() {
    this.sessionService.removeTokenFromEverywhere();
    this.sessionService.resetUser();
  }

  saveUser(user: User) : Observable<AuthorizeResult> {
    return this.http.post<AuthorizeResult>('http://localhost:8080/users/save', user)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(result => {
          console.log("tap worked");
          if (result.success) {
            this.sessionService.updateTokenWhereItWasSet(result.token);
          }
        })
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
