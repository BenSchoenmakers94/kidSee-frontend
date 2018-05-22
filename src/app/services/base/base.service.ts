import { Observable } from 'rxjs/Observable';
import { JsonApiModel } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/baseModel';

@Injectable()
export abstract class BaseService {
    constructor() { }

    abstract getAllObjects(): Observable<BaseModel[]>;

    abstract getObjectsPage(pageNumber: number, pageSize: number): Observable<BaseModel[]>;

    abstract getObjectFromId(id: string): Observable<BaseModel>;

    abstract postObject(object: any): Promise<any>;

    abstract patchObject(object: any): Promise<any>;

    abstract deleteObject(id: string);

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
