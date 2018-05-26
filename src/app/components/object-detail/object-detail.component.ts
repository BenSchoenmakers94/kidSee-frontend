import { BaseService } from './../../services/base/base.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../models/baseModel';
import { MatDialog } from '@angular/material';
import { RemoveDialogComponent } from '../../dialogs/remove-dialog/remove-dialog.component';

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
    private router: Router,
    private dialog: MatDialog) { }

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
              values: valuesForType[i]['name'],
              object: valuesForType[i]
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

  private getIterableObjectWith(value: string): string[] {
    for (let index = 0; index < this.iterableTypes.length; index++) {
      const element = this.iterableTypes[index];
      if (element.values.toLowerCase().includes(value.toLowerCase())) {
        return element.object;
      }
    }
}

  public updateSimpleAttributeState(type: string, value: string) {
    this.object[type.toLowerCase()] = value;
  }

  public updateBelongsToState(type: string, value: string) {
    const objectToAdd = this.getIterableObjectWith(value);
    if (objectToAdd) {
      this.object[type.toLowerCase()] = objectToAdd;
    }
  }

  saveObject() {
    this.baseService.patchObject(this.object);
  }

  removeObject() {
    const dialogRef = this.dialog.open(RemoveDialogComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.baseService.deleteObject(this.object);
      }
      this.router.navigate([this.objectType]);
    });
  }
}
