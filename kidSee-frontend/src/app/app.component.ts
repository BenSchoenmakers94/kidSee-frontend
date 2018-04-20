import {Component } from '@angular/core';
import { User } from "./models/user";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'KidSee CMS Platform';
  user: User;

  constructor(private authService: AuthService, private router: Router){
    this.authService.fetchCurrentUser().then(user => this.user = user);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
