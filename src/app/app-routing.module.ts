import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserListPageComponent} from "./page/user-list-page/user-list-page.component";
import {RegisterPageComponent} from "./page/register-page/register-page.component";
import {SuccessfulRegistrationComponent} from "./page/successful-registration/successful-registration.component";
import {MainPageComponent} from "./page/main-page/main-page.component";
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {UserProfileComponent} from "./page/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'successful-registration',
    component: SuccessfulRegistrationComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'user-profiles',
    component: UserProfileComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
