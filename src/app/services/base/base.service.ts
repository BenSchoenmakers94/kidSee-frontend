import { Observable } from 'rxjs/Observable';
import { JsonApiModel } from 'angular2-jsonapi';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseService {
    constructor() { }

    abstract getObjects(pageNumber: number, pageSize: number): Observable<JsonApiModel[]>;

    abstract getObjectFromId(id: string): Observable<JsonApiModel>;

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
