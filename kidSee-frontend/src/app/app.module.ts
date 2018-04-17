import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserReadComponent } from './components/user-read/user-read.component';
import { UserService } from "./services/userService/user-serivce.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Datastore } from "./services/datastore";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserReadComponent,
  ],
  imports: [
    BrowserModule,
    JsonApiModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserReadComponent
  ],
  providers: [
    Datastore,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
