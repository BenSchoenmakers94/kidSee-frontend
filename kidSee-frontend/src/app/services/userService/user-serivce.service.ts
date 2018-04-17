import { Injectable } from '@angular/core';
import { Datastore } from "../datastore";
import { User } from "../../models/user";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private datastore: Datastore) { }

  public getUsers(){
    return this.datastore.findAll(User);
  }

  public createUser(user: any){
    return this.datastore.createRecord(User, user);
  }

}
