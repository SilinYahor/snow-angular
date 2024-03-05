import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../entity/User";
import {Subscription} from "rxjs";
import {SessionService} from "../../service/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css']
})
export class UserListPageComponent implements OnInit, OnDestroy {
  loading = false;
  term: string = '';

  userService: UserService;
  private sessionService: SessionService;
  private router: Router;
  users: User[];

  private subscription1: Subscription;
  private subscription2: Subscription;

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
        if (!this.sessionService.isCurrentUserAdmin()) {
          this.navigateToMainPage();
        }

        this.loading = true;

        this.subscription2 = this.userService.getAll()
          .subscribe(result => {
            this.users = result;
            this.loading = false;
          });
      });


  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }

  private navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
