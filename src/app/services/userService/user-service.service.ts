import { Injectable } from '@angular/core';
import { Datastore } from "../datastore";
import { User } from "../../models/user";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private datastore: Datastore) { }

  public getUsers(params: {}){
    return this.datastore.findAll(User, params);
  }

  public getSpecificUser(id){
    return new Promise<any> ( (resolve) => {
      return this.datastore.findRecord(User, id).subscribe(
        (user) => {
          resolve(user);
        },
        (err) =>{
          resolve(null);
        })
    });

  }

  public createUser(user: any){    
    return this.datastore.createRecord(User, user).save();
  }

  public deleteUser(id){
    return this.datastore.deleteRecord(User, id);
  }

}
