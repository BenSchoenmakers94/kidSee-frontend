import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserCreateComponent } from "../user-create/user-create.component";
import { LoginComponent } from "../login/login.component";
import { UserUpdateComponent } from "../user-update/user-update.component";
import { UserReadComponent } from "../user-read/user-read.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: UserListComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/create',
    component: UserCreateComponent
  },
  {
    path: 'users/edit/:id',
    component: UserUpdateComponent
  },
  {
    path: 'users/view/:id',
    component: UserReadComponent
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
