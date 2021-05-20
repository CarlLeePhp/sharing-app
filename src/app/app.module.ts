import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './modals/register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { SharingComponent } from './sharing/sharing.component';
import { LoginComponent } from './modals/login/login.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { SharingItemComponent } from './sharings/sharing-item/sharing-item.component';
import { SharingListComponent } from './sharings/sharing-list/sharing-list.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { SharingDetailComponent } from './sharings/sharing-detail/sharing-detail.component';
import { SharingFormComponent } from './sharings/sharing-form/sharing-form.component';
import { MyJoiningsComponent } from './joinings/my-joinings/my-joinings.component';
import { JoiningFormComponent } from './joinings/joining-form/joining-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { SearchResultComponent } from './sharings/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    ProfileComponent,
    SharingComponent,
    LoginComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SharingItemComponent,
    SharingListComponent,
    SharingDetailComponent,
    SharingFormComponent,
    MyJoiningsComponent,
    JoiningFormComponent,
    ForgotPasswordComponent,
    CommentFormComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
