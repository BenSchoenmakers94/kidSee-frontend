import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
        this.emailFormControl.hasError('email') ? 'Not a valid email' :
        this.passwordFormControl.hasError('required') ? 'You must enter a value' :
        '';
  }

  login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    this.authService.login({ 'identification': email, 'password': password })
    .then(resolve => {
      this.router.navigate(['resources']);
    }, reject => {
      console.log(reject);
    });
  }
}
