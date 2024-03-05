import { Component, Input } from '@angular/core';
import {User} from "../../entity/User";

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent {
  @Input() user: User;

  getUserName(): string {
    if (!this.user)
      return '';
    return this.user.login + ' (' + this.user.name + ')'
  }

  getUserEmail() : string {
    if (!this.user)
      return '';
    return this.user.email;
  }
}
