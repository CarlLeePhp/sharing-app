import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { MyJoiningsComponent } from './joinings/my-joinings/my-joinings.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { SharingComponent } from './sharing/sharing.component';
import { SearchResultComponent } from './sharings/search-result/search-result.component';
import { SharingDetailComponent } from './sharings/sharing-detail/sharing-detail.component';
import { SharingFormComponent } from './sharings/sharing-form/sharing-form.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      { path: 'sharing', component: SharingComponent },
      { path: 'sharingForm', component: SharingFormComponent },

      { path: 'joinings', component: MyJoiningsComponent },
      { path: 'comment-form', component: CommentFormComponent },
      { path: 'members', component: MemberListComponent },
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  {
    path: 'search-result/:categoryId/:keyword',
    component: SearchResultComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sharing-detail', component: SharingDetailComponent },
  { path: 'sharing-detail/:id', component: SharingDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
