import { Rating } from './../../models/rating';
import { Status } from './../../models/postStatus';
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
import { Comment } from './../../models/comment';
import { Assignment } from '../../models/assignment';
import { AssignmentType } from '../../models/assignmentType';
import { AnswerType } from '../../models/answerType';
import { Answer } from '../../models/answer';

@Injectable()
export class BaseService {
    private modelTypes;
    private notShowableModelTypes;

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
            type: 'statuses',
            modelType: Status
          },
          {
            type: 'themes',
            modelType: Theme
          },
          {
            type: 'assignments',
            modelType: Assignment
          },
          {
            type: 'assignment-types',
            modelType: AssignmentType
          },
          {
            type: 'answers',
            modelType: Answer
          },
          {
            type: 'answer-types',
            modelType: AnswerType
          }
          ];

          this.notShowableModelTypes = [{
              type: 'ratings',
              modelType: Rating
          }];
    }

    public resolveType(type: string) {
        for (let index = 0; index < this.modelTypes.length; index++) {
            if (this.modelTypes[index]['type'].includes(type.toLowerCase())) {
                return this.modelTypes[index]['modelType'];
            }
        }
        for (let index = 0; index < this.notShowableModelTypes.length; index++) {
            if (this.notShowableModelTypes[index]['type'].includes(type.toLowerCase())) {
                return this.notShowableModelTypes[index]['modelType'];
            }
        }
        return null;
    }

    getAllObjects(type: string): Observable<BaseModel[]> {
         const modelType = this.resolveType(type);
         return Observable.create((observer) => {
            this.datastore.findAll(modelType, {
                page_size: 999
             }).subscribe(
              objects => {
                observer.next(objects.getModels());
              }
            );
          });
    }

    getObjectsPage(type: string, pageNumber?: number, pageSize?: number): Observable<BaseModel[]> {
        const modelType = this.resolveType(type);
          return Observable.create((observer) => {
            this.datastore.findAll(modelType, {
              page: pageNumber,
              page_size: pageSize
             }).subscribe(
              objects => observer.next(objects.getModels())
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
            const newObject = this.datastore.createRecord(modelType, object).save().subscribe(result => {
                resolve(result);
            });
        }));
    }

    postObjectData(object: any): Promise<any> {
    return new Promise(((resolve, reject) => {
        // tslint:disable-next-line:prefer-const
        let newLocation = this.datastore.createRecord(Location, {
          'name': 'No value set',
          'lon': object.lon,
          'lat': object.lat,
          'description': object.description,
          'address': object.address
        });
        this.getObjectFromId('0', 'location-types').subscribe((result: LocationType) => {
            newLocation['location-type'] = result;
            newLocation.save().subscribe(resulter => {
                resolve(resulter);
            });
        });
      }));
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

    public getFilteredObjects(type: string, filterProperty: string, filterValue: string): Observable<BaseModel[]> {
        const modelType = this.resolveType(type);
         return Observable.create((observer) => {
            this.datastore.findAll(modelType, {
                page_size: 999,
                filter: '[' + filterProperty + ']=' + filterValue
             }).subscribe(
              objects => {
                observer.next(objects.getModels());
              }
            );
          });
    }

    public getFilteredAndSortedObjects(type: string,
        filterProperty: string,
        filterValue: string,
        sortProperty: string,
        asc: boolean,
        limit: number): Observable<BaseModel[]> {

            const modelType = this.resolveType(type);
            if (!asc) {
                sortProperty = '-'.concat(sortProperty);
            }
            const filterOpt = 'filter[' + filterProperty + ']';
            const params = {
                page_size: limit,
                sort: sortProperty
             };
             params[filterOpt] = filterValue;
            return Observable.create((observer) => {
                this.datastore.findAll(modelType, params).subscribe(
                objects => {
                    observer.next(objects.getModels());
                }
                );
            });
    }

    public getSortedObjects(type: string, sortProperty: string, asc: boolean, limit: number): Observable<BaseModel[]> {
        const modelType = this.resolveType(type);
            if (!asc) {
                sortProperty = '-'.concat(sortProperty);
            }
            const params = {
                page_size: limit,
                sort: sortProperty
             };
             return Observable.create((observer) => {
                this.datastore.findAll(modelType, params).subscribe(
                objects => {
                    observer.next(objects.getModels());
                }
                );
            });
    }
}
