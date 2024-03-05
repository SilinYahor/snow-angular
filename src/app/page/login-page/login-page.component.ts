import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private userService: UserService;
  private sessionService: SessionService;
  private router: Router;

  globalError: string = '';

  private subscription1: Subscription;
  private subscription2: Subscription;

  form = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
    rememberMe: new FormControl<boolean>(false)
  });

  constructor(userService: UserService,
              sessionService: SessionService,
              router: Router) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.router = router;
  }

  ngOnInit() {
    this.subscription1 = this.sessionService.connectAndFindUser()
      .subscribe(result => {
        if (this.sessionService.isCurrentUserAuthorized()) {
          this.navigateToMainPage();
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  isGlobalErrorSet() : boolean {
    return this.globalError != '';
  }

  submit() {
    this.loginUser();
  }

  private loginUser() {
    let login = this.form.value.login;
    let password = this.form.value.password;
    let rememberMe = this.form.value.rememberMe;

    this.subscription2 = this.userService.login(login, password, rememberMe)
      .subscribe(result => {
        if (result.success) {
          this.navigateToMainPage();
        } else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
