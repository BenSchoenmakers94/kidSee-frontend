import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Datastore } from './datastore';
import { User } from '../../app/models/user';
import * as bcrypt from 'bcryptjs';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
  private currentUser: User;
  private storage: Storage;
  private LoggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.LoggedIn.asObservable();
  }

  constructor( private datastore: Datastore,
               public httpClient: HttpClient) {
    this.storage = window.localStorage;
    if (this.isAuthenticated()) {
      this.LoggedIn.next(true);
    }
  }

  login(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.datastore.getBaseUrl() + '/tokens', credentials,
        { headers: new HttpHeaders({ 'Content-Type': 'application/vnd.api+json' }) })
        .subscribe(res => {
          this.storage.setItem('currentUser', res['meta']['id']);
          this.storage.setItem('token', res['meta']['token']);
          this.fetchCurrentUser().then(user => {
            if (!user) {
              this.datastore.headers = null;
              reject('No user found with that username');
            } else {
              this.LoggedIn.next(true);
              resolve(user);
            }
          });
        });
    });
  }

  fetchCurrentUser() {
    return new Promise<any>((resolve) => {
      if (this.currentUser) {
        resolve(this.currentUser);
      }
      const currentUserIdInStorage = this.storage.getItem('currentUser');
      if (currentUserIdInStorage) {
        this.datastore.findRecord(User, currentUserIdInStorage).subscribe(
          (user) => {
            this.currentUser = user;
            resolve(user);
          },
          (err) => {
            resolve(null);
          });
      }
    });
  }

  public isAuthenticated() {
    if (this.storage.getItem('token')) {
      return this.fetchCurrentUser().then(user => {
        return user != null;
      });
    }
    return false;
  }

  logout() {
    this.LoggedIn.next(false);
    this.currentUser = null;
    this.datastore.headers = null;
    this.storage.removeItem('token');
    this.storage.removeItem('currentUser');
  }

  changePassword(password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        this.currentUser.password = hash;
        this.currentUser.save().subscribe();
      });
    });
  }
}
