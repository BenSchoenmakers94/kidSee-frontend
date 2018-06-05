import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Home';
  user: User;
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.fetchCurrentUser().then(user => this.user = user);
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
