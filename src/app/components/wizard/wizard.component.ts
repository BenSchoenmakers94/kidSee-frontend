import { Datastore } from './../../services/datastore';
import { BaseService } from './../../services/base/base.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModelType } from 'angular2-jsonapi';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  public objectType: string;
  public objectToCreate: BaseModel;
  public stepCounter: number;
  private iterableTypes = [];
  private subObject: BaseModel;

  constructor(
    private router: Router,
    private baseService: BaseService,
    private dataStore: Datastore,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.stepCounter = 0;
    const routerSegments = this.router.url.split('/');
    this.objectType = routerSegments[routerSegments.length - 2];
    const modelType = this.baseService.resolveType(this.objectType);
    this.objectToCreate = new modelType(this.dataStore);

    if (routerSegments.length >= 5) {
      this.baseService.getObjectFromId(
        routerSegments[routerSegments.length - 3],
        routerSegments[routerSegments.length - 4]).subscribe(result => {
          this.subObject = result;
        });
    }

    for (let index = 0; index < this.objectToCreate.belongsToAttributes.length; index++) {
      this.baseService.getAllObjects(this.objectToCreate.belongsToAttributes[index].name).subscribe(valuesForType => {
        for (let i = 0; i < valuesForType.length; i++) {
          this.iterableTypes.push({
            type: this.objectToCreate.belongsToAttributes[index].name,
            values: valuesForType[i]['name'],
            object: valuesForType[i]
          });
        }
      });
    }
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

  private getIterableObjectWith(value: string): string[] {
      for (let index = 0; index < this.iterableTypes.length; index++) {
        const element = this.iterableTypes[index];
        if (element.values.toLowerCase().includes(value.toLowerCase())) {
          return element.object;
        }
      }
  }

  public incrementStep() {
    this.stepCounter++;
  }

  public decrementStep() {
    this.stepCounter--;
  }

  public updateSimpleAttributeState(value: string) {
    const attributeToUpdate = this.objectToCreate.getAttributeNamesForCreation()[this.stepCounter - 1];
    this.objectToCreate[attributeToUpdate.toLowerCase()] = value;
  }

  public updateBelongsToState(value: string) {
    const objectToAdd = this.getIterableObjectWith(value);
    if (objectToAdd) {
      const attributeToUpdate = this.objectToCreate.getAttributeNamesForCreation()[this.stepCounter - 1];
      this.objectToCreate[attributeToUpdate.toLowerCase()] = objectToAdd;
    }
  }

  public saveObject() {
    let navUrl = '';
    this.baseService.postObject(this.objectToCreate);
    if (this.subObject) {
      this.subObject[this.objectType.toLowerCase()] = this.objectToCreate;
      this.baseService.patchObject(this.subObject);
      navUrl = this.subObject.modelConfig.type + '/' + this.subObject.id;
    } else {
      navUrl = this.objectType.toLowerCase();
    }
    this.router.navigate([navUrl]);
  }
}
