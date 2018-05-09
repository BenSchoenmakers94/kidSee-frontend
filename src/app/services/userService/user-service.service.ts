import { Injectable } from '@angular/core';
import { Datastore } from "../datastore";
import { User } from "../../models/user";
import { Observable } from "rxjs/Observable";
import { BaseService } from "../base/base.service";
import {JsonApiModel, JsonApiQueryData} from "angular2-jsonapi";
import {Location} from "../../models/location";

@Injectable()
export class UserService extends BaseService {

  constructor(private datastore: Datastore) {
    super();
  }

  getAllObjects(): Observable<JsonApiModel[]> {
    return Observable.create((observer) => {
      this.datastore.findAll(User, {}).subscribe(
        (users: JsonApiQueryData<User>) => observer.next(users.getModels())
      );
    });
  }

  getObjectsPage(pageNumber: number, pageSize: number): Observable<JsonApiModel[]> {
    return Observable.create((observer) => {
      this.datastore.findAll(User, {
        page: pageNumber,
        page_size: pageSize
      }).subscribe(
        (users: JsonApiQueryData<User>) => observer.next(users.getModels())
      );
    });
  }

  getObjectFromId(id: string): Observable<JsonApiModel> {
    return Observable.create((observer) => {
      return this.datastore.findRecord(User, id).subscribe(
        (user) => {
          observer.next(user);
        })
    });
  }

  postObject(user: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.datastore.createRecord(User, user).save();
    }));
  }

  patchObject(object: any): Promise<any> {
    return undefined;
  }

  deleteObject(id: string) {
    this.datastore.deleteRecord(User, id).subscribe();
  }


  public getSpecificUser(id){


  }
}
