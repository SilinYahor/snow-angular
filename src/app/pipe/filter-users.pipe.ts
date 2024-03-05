import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../entity/User";

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], search: string): User[] {
    if (!users)
      return [];
    return users.filter(u => this.userFitsBySearchStr(u, search));
  }

  private userFitsBySearchStr(user: User, search: string) {
    let searchLower = search.toLowerCase();
    return user.name.toLowerCase().includes(searchLower) ||
           user.email.toLowerCase().includes(searchLower) ||
           user.login.toLowerCase().includes(searchLower);
  }
}
