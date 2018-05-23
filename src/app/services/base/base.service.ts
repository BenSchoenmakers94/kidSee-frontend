import { PostStatus } from './../../models/postStatus';
import { ContentType } from './../../models/contentType';
import { LocationType } from './../../models/locationType';
import { Location } from './../../models/location';
import { User } from './../../models/user';
import { Datastore } from './../datastore';
import { Observable } from 'rxjs/Observable';
import { JsonApiModel, JsonApiQueryData, ModelType } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/baseModel';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../../models/theme';
import { Post } from '../../models/post';

@Injectable()
export class BaseService {
    private modelTypes;

    constructor(private datastore: Datastore, private http: HttpClient) {
        this.modelTypes = [{
            type: 'locations',
            modelType: Location
          },
          {
            type: 'users',
            modelType: User
          },
          {
            type: 'location-types',
            modelType: LocationType
          },
          {
            type: 'comments',
            modelType: Comment
          },
          {
            type: 'content-types',
            modelType: ContentType
          },
          {
            type: 'posts',
            modelType: Post
          },
          {
            type: 'postStatuses',
            modelType: PostStatus
          }];
    }

    private resolveType(type: string) {
        for (let index = 0; index < this.modelTypes.length; index++) {
            if (this.modelTypes[index]['type'] === type.toLowerCase()) {
                return this.modelTypes[index]['modelType'];
            }
        }
        return null;
    }

    getAllObjects(type: string): Observable<BaseModel[]> {
         const modelType = this.resolveType(type);
         return Observable.create((observer) => {
            this.datastore.findAll(modelType, { }).subscribe(
              objects => {
                observer.next(objects.getModels());
              }
            );
          });
    }

    getObjectsPage(pageNumber?: number, pageSize?: number): Observable<BaseModel[]> {
          return Observable.create((observer) => {
            this.datastore.findAll(Location, {
              page: pageNumber,
              page_size: pageSize
             }).subscribe(
              (locations: JsonApiQueryData<Location>) => observer.next(locations.getModels())
            );
          });
    }

    getObjectFromId(id: string, type: string): Observable<BaseModel> {
        const modelType = this.resolveType(type);
        return new Observable((observer) => {
          this.datastore.findRecord(modelType, id).subscribe((object: BaseModel) => observer.next(object));
        });
    }

    postObject(object: BaseModel): Promise<any> {
        const modelType = this.resolveType(object.modelConfig.type);
        return new Promise(((resolve, reject) => {
            this.createObject(object);
        }));
    }

    private createObject(object: BaseModel) {
        const modelType = this.resolveType(object.modelConfig.type);
        const newLocation = this.datastore.createRecord(modelType, object).save().subscribe();
    }

    patchObject(object: BaseModel): Promise<any> {
        const modelType = this.resolveType(object.modelConfig.type);
        return new Promise((resolve, reject) => {
          object.save().subscribe(savedObject => {
              resolve(savedObject);
          });
        });
    }

    deleteObject(object: BaseModel) {
        const modelType = this.resolveType(object.modelConfig.type);
        this.datastore.deleteRecord(modelType, object.id).subscribe();
    }

    getPageNumberObject(pageNumber: number): any {
        if (pageNumber !== undefined) {
            return { page: pageNumber };
        } else {
            return { };
        }
    }

    getPageSizeObject(pageSize: number): any {
        if (pageSize !== undefined) {
            return { page_size: pageSize };
        } else {
            return { };
        }
    }
}
