import { BaseService } from './../../services/base/base.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.css']
})
export class ObjectDetailComponent implements OnInit {

  private objectType: string;
  private objectId: string;
  private iterableTypes = [];

  public object: BaseModel;

  constructor(
    private baseService: BaseService,
    private router: Router) { }

  ngOnInit() {
    const routerSegments = this.router.url.split('/');
    this.objectId = routerSegments[routerSegments.length - 1];
    this.objectType = routerSegments[routerSegments.length - 2];

    this.baseService.getObjectFromId(this.objectId, this.objectType).subscribe(object => {
      this.object = object;
      for (let index = 0; index < object.belongsToAttributes.length; index++) {
        this.baseService.getAllObjects(object.belongsToAttributes[index].name).subscribe(valuesForType => {
          for (let i = 0; i < valuesForType.length; i++) {
            this.iterableTypes.push({
              type: object.belongsToAttributes[index].name,
              values: valuesForType[i]['name']
            });
          }
        });
      }
    });
  }

public getIterableTypesOf(attributeName: string): string[] {
  const types = [];
    for (let index = 0; index < this.iterableTypes.length; index++) {
      if (this.iterableTypes[index]['type'] === attributeName) {
        types.push(this.iterableTypes[index]['values']);
      }
    }
    return types;
}

saveObject() {
    console.log(this.object);
  }
}
