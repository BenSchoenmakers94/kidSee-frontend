import { LocationService } from './location.service';
import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';

@Injectable()
export class AbstractObjectService {
  private _types: Dictionary[];

  constructor(private locationService: LocationService) {
    this._types = [];
    this.addType('locations', locationService);
   }

  public addType(name: string, baseService: BaseService) {
    if (baseService !== undefined) {
      this._types.push({
        name: name,
        type: baseService
      });
    }
  }

  public getObject(name: string): BaseService {
    let type: BaseService;

    this._types.forEach(serviceObject => {
      if (serviceObject.name === name) {
        type = serviceObject.type;
      }
    });

    if (type !== undefined) {
      return type;
    }
  }
}

interface Dictionary {
  name: string;
  type: BaseService;
}
