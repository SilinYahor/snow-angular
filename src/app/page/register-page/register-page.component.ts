import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../entity/User";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private userService: UserService;
  private sessionService: SessionService;
  private router: Router;

  globalError: string = '';

  private subscription1: Subscription;
  private subscription2: Subscription;

  form = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
    confirmPassword: new FormControl<string>(''),
    name: new FormControl<string>(''),
    email: new FormControl<string>('')
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
    if (this.subscription1)
      this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }

  isGlobalErrorSet() : boolean {
    return this.globalError != '';
  }

  submit() {
    let password = this.form.value.password;
    let confirmPassword = this.form.value.confirmPassword;
    if (password != confirmPassword) {
      this.globalError = 'Пароли не совпадают';
      return;
    }

    this.registerUser();
  }

  private registerUser() {
    let login = this.form.value.login;
    let password = this.form.value.password;
    let name = this.form.value.name;
    let email = this.form.value.email;

    let user = new User(null, login, password, name, email, null);
    this.subscription2 = this.userService.register(user)
      .subscribe(result => {
        if (result.success) {
          this.navigateToSuccessfulRegPage();
        } else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToSuccessfulRegPage() {
    this.router.navigate(['/successful-registration']);
  }

  private navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
