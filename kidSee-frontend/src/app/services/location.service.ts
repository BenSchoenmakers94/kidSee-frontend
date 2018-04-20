import { Location } from './../models/location';
import { Datastore } from './datastore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Injectable()
export class LocationService {

  constructor(private datastore: Datastore, private http: HttpClient) { }

  postLocations(location: any): Promise<any> {
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

  getLocations(): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.datastore.findAll(Location, { }).subscribe(
        (locations: JsonApiQueryData<Location>) => resolve(locations.getModels())
      );
    }));
  }

  deleteLocation(location: Location) {
    this.datastore.deleteRecord(Location, location.id).subscribe();
  }

}
