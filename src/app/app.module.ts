import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FilterUsersPipe } from './pipe/filter-users.pipe';
import { HeaderComponent } from './component/header/header.component';
import { LargeAreaComponent } from './component/large-area/large-area.component';
import { NarrowAreaComponent } from './component/narrow-area/narrow-area.component';
import { ErrorComponent } from './component/error/error.component';
import {UserListPageComponent} from "./page/user-list-page/user-list-page.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import { UserRowComponent } from './component/user-row/user-row.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainPageComponent } from './page/main-page/main-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { SuccessfulRegistrationComponent } from './page/successful-registration/successful-registration.component';
import { UserProfileComponent } from './page/user-profile/user-profile.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterUsersPipe,
    UserListPageComponent,
    HeaderComponent,
    LargeAreaComponent,
    NarrowAreaComponent,
    ErrorComponent,
    UserRowComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SuccessfulRegistrationComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
