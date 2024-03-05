import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {SessionService} from "../../service/session.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../entity/User";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private userService: UserService;
  private sessionService: SessionService;
  private router: Router;

  user: User;

  globalError = '';
  successMessage = '';

  private subscription0: Subscription;
  private subscription1: Subscription;
  private subscription2: Subscription;

  form = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
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
    this.subscription0 = this.sessionService.connectAndFindUser()
      .subscribe(result => {
        if (!this.sessionService.isCurrentUserAuthorized()) {
          this.navigateToMainPage();
        }

        this.subscription1 = this.sessionService.connectAndFindUser()
          .subscribe(result => {
            this.user = result;
            this.updateFormFields();
          });
      });
  }

  ngOnDestroy() {
    if (this.subscription0) {
      this.subscription0.unsubscribe();
    }
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  private updateFormFields() {
    this.form.controls.login.setValue(this.user.login);
    this.form.controls.password.setValue(this.user.password);
    this.form.controls.name.setValue(this.user.name);
    this.form.controls.email.setValue(this.user.email);
  }

  isGlobalErrorSet() : boolean {
    return this.globalError != '';
  }

  submit() {
    this.saveChanges();
  }

  private saveChanges() {
    let login = this.form.value.login;
    let password = this.form.value.password;
    let name = this.form.value.name;
    let email = this.form.value.email;

    this.user.login = login;
    this.user.password = password;
    this.user.name = name;
    this.user.email = email;

    this.subscription2 = this.userService.saveUser(this.user)
      .subscribe(result => {
        if (result.success) {
          this.globalError = '';
          this.successMessage = 'Изменения успешно сохранены';
        } else {
          this.successMessage = '';
          this.globalError = result.message;
        }
      });
  }

  getUserRoleName() : string {
    if (this.user)
      return this.user.role.shownName;
    return 'Неизвестна';
  }

  private doTransferToMainPage() {
    this.router.navigate(['/']);
  }

  private navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
