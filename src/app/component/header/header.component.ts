import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userService: UserService;
  sessionService: SessionService;
  private router: Router;

  constructor(userService: UserService,
              sessionService: SessionService,
              router: Router) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.router = router;
  }

  getUserName() : string {
    if (this.sessionService.getUser()) {
      return this.sessionService.getUser().login;
    }
    return 'Мой профиль';
  }

  logOut() {
    this.userService.logOut();
    this.doTransferToMainPage();
  }

  doTransferToMainPage() {
    this.router.navigate(['/']);
  }
}
