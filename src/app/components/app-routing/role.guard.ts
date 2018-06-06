import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.authService.fetchCurrentUser().then(user => {
        if(user.role.name == 'admin') {
          resolve(true);
        }
      })
        .catch(function () {
          resolve(false);
        });
    });
  }
}
