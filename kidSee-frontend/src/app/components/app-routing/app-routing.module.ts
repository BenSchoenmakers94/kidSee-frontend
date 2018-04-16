import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserCreateComponent } from "../user-create/user-create.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/create',
    component: UserCreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }