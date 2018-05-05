import { Observable } from 'rxjs/Observable';
import { Location } from './../models/location';
import { Datastore } from './datastore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonApiQueryData, JsonApiModel } from 'angular2-jsonapi';
import { BaseService } from './base/base.service';

@Injectable()
export class LocationService extends BaseService {
  constructor(private datastore: Datastore, private http: HttpClient) {
    super();
   }

  getObjects(pageNumber?: number, pageSize?: number): Observable<JsonApiModel[]> {
      return Observable.create((observer) => {
        this.datastore.findAll(Location, {
          page: pageNumber,
          page_size: pageSize
         }).subscribe(
          (locations: JsonApiQueryData<Location>) => observer.next(locations.getModels())
        );
      });
    }

  getObjectFromId(id: string): Observable<JsonApiModel> {
    return new Observable((observer) => {
      this.datastore.findRecord(Location, id).subscribe((location: Location) => observer.next(location));
    });
  }

  postObject(location: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let newLocation = this.datastore.createRecord(Location, {
        'name': location.name,
        'lon': location.lon,
        'lat': location.lat,
        'description': location.description,
        'address': location.address
      });
      newLocation.save().subscribe();
    }));
  }

  patchObject(locationToUpdate: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findRecord(Location, locationToUpdate.id).subscribe((location: Location) => {
        location.name = locationToUpdate.name,
        location.lon = locationToUpdate.lon,
        location.lat = locationToUpdate.lat,
        location.description = locationToUpdate.description,
        location.address = locationToUpdate.address;
        location.save().subscribe();
       });
    });
  }

  deleteObject(id: string) {
    this.datastore.deleteRecord(Location, id).subscribe();
  }
}
