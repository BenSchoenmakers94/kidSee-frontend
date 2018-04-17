import { Injectable } from '@angular/core';
import { Datastore } from "../datastore";
import { User } from "../../models/user";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private datastore: Datastore) { }

  public getUsers(params: {}){
    this.datastore.headers = new Headers({ 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJraWRzZWVfYXBpIiwiZXhwIjoxNTI2MzcxNTU1LCJpYXQiOjE1MjM5NTIzNTUsImlzcyI6ImtpZHNlZV9hcGkiLCJqdGkiOiI3MmVkNTExMy1jMWY3LTQ2ZDAtYmMzNC1mYTIyZGNhYmQ0YTIiLCJuYmYiOjE1MjM5NTIzNTQsInN1YiI6IjI1IiwidHlwIjoiYWNjZXNzIn0.8vjONwbF9UjZ_GANLPWeN7GcQ9yV9V2-7ZYoNRDOaUdZM3gU-W7TsGPIz02TaVIDDj9DQFJp4pqCmJ95PArNlg"});
    return this.datastore.findAll(User, params);
  }

  public createUser(user: any){
    return this.datastore.createRecord(User, user).save();
  }

}
