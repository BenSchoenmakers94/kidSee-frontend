import { JsonApiModel } from 'angular2-jsonapi';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { CreateDialogComponent } from './../../dialogs/create-dialog/create-dialog.component';
import { ColumnAttribute } from './../column-attribute';
import { RemoveDialogComponent } from '../../dialogs/remove-dialog/remove-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatInput } from '@angular/material';
import * as _ from 'lodash';
import { BaseService } from '../../services/base/base.service';
import { UserEditDialogComponent } from '../../dialogs/useredit-dialog/useredit-dialog.component';
import { UserRemoveDialogComponent } from '../../dialogs/userremove-dialog/userremove-dialog.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() objectType: string;
  @Input() columnAttributes: ColumnAttribute[];
  @Input() possibleActions: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filterInput: MatInput;

  public objectData: any[];
  private objectDataLocalFiltered: any[];
  public displayedColumns: string[];
  private specificObjectService: BaseService;
  public pageNumber: number;
  public pageSize: number;
  public pageSizeOptions = ('' + Array(20)).split(',').map(function() { return this[0]++; }, [1]);
  public maxObjectsLengthInStorage: number;
  private maxObjectsLengthInStorageCopy: number;
  public objectAttributes: string[];

  constructor(public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private abstractObjectService: AbstractObjectService) { }

  ngOnInit() {
    this.specificObjectService = this.abstractObjectService.getObject(this.objectType);
    this.pageNumber = 1;
    this.pageSize = 10;
    this.displayedColumns = [];
    this.objectData = [];
    this.objectDataLocalFiltered = [];
    this.receiveAllData().then(result => {
      this.initColumns(result[8]);
      this.maxObjectsLengthInStorage = result.length;
      this.checkForChanges(result);
    });
   }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe({
      next: sort => this.checkForChanges(
        this.sortDataWith(
          this.sort.direction,
          this.sort.active,
          this.objectData))
    });

    this.paginator.page.subscribe(next => {
      if (!this.filterInput.value) {
        this.paginator.length = this.maxObjectsLengthInStorageCopy;
        this.pageNumber = this.paginator._pageIndex + 1;
        this.pageSize = this.paginator.pageSize;
        this.receivePageData(this.pageNumber, this.pageSize).then(result => {
        this.checkForChanges(
        this.sortDataWith(
        this.sort.direction,
        this.sort.active,
        result));
      });
      } else {
        this.checkForChanges(
          this.sortDataWith(
          this.sort.direction,
          this.sort.active,
          this.receiveLocalPageData(this.paginator.pageIndex + 1, this.paginator.pageSize)));
      }
    });
  }

  private receiveLocalPageData(pageNumber: number, pageSize: number): any[] {
    const returnableObjects = this.objectDataLocalFiltered;
    let startIndex = (pageNumber - 1) * pageSize;
    if (startIndex < 0) {
      startIndex = 0;
    }
    const endIndex = pageNumber * pageSize;
    const test = returnableObjects.slice(startIndex, endIndex);
    return test;
  }

  private receiveAllData(): Promise<JsonApiModel[]> {
    return new Promise(resolve => {
      this.specificObjectService.getAllObjects().subscribe({
        next: objects => {
          resolve(objects);
          this.maxObjectsLengthInStorageCopy = objects.length;
        }
      });
    });
  }

  private receivePageData(pageNumber: number, pageSize: number): Promise<JsonApiModel[]> {
    return new Promise(resolve => {
      this.specificObjectService.getObjectsPage(pageNumber, pageSize).subscribe({
        next: objects => resolve(objects)
      });
    });
  }

  private initColumns(object: JsonApiModel) {
    console.log(object.getAttributeNames());
    this.columnAttributes.forEach(columnAttribute => {
      this.displayedColumns.push(columnAttribute.columnName);
    });
    this.displayedColumns.push('Actions');
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.receiveAllData().then(result => {
      const approvedObjects = result.filter(object => this.compareValues(object, filterValue));
      this.paginator.length = approvedObjects.length;
      this.paginator.pageIndex = 0;
      this.objectDataLocalFiltered = approvedObjects;
      this.checkForChanges(approvedObjects.slice(0, this.paginator.pageSize));
    });
  }

  private compareValues(object: any, lowerCasedValue: string): boolean {
    for (let index = 0; index < this.columnAttributes.length; index++) {
      const value = this.getAttributeFromRow(object, this.columnAttributes[index].columnName);
      if (value.toString().toLowerCase().includes(lowerCasedValue)) {
        return true;
      }
    }
  }

  private getAttributeFromRow(object: any, column: string): string {
    for (let index = 0; index < this.columnAttributes.length; index++) {
      if (this.columnAttributes[index].columnName === column) {
        return object[this.columnAttributes[index].attributeName];
      }
    }
  }

  private handleAction(actionToDo: string, object: any) {
    switch (actionToDo) {
      case 'create': {
        this.createObject(object);
        break;
      }
      case 'edit': {
        this.startEdit(object);
        break;
      }
      case 'delete': {
        this.remove(object);
        break;
      }
    }
  }


  private createObject(objectToCreate: any) {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: objectToCreate //TODO - Update table
    });
  }

  private startEdit(objectToEdit: any) {
    const tempObjectClone = _.cloneDeep(objectToEdit);
    //TODO: delete this if when modular dialogs are available
    let dialogRef;
    if (tempObjectClone.username != null) {
      dialogRef = this.dialog.open(UserEditDialogComponent, {
        data: tempObjectClone
      });
    } else {
      dialogRef = this.dialog.open(EditDialogComponent, {
        data: tempObjectClone
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.returnObjectState(objectToEdit, tempObjectClone);
        this.checkForChanges(this.objectData);
       }
    });
  }

  private remove(objectToRemove: any) {

    //TODO: delete this if when modular dialogs are available
    let dialogRef;
    if (objectToRemove.username != null) {
      dialogRef = this.dialog.open(UserRemoveDialogComponent, {
        data: objectToRemove
      });
    } else {
      dialogRef = this.dialog.open(RemoveDialogComponent, {
        data: objectToRemove
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.objectData.splice(this.objectData.indexOf(objectToRemove), 1);
        this.checkForChanges(this.objectData);
      }
    });
  }

  private returnObjectState(oldObject: any, newObject: any) {
    const newKeys = Object.keys(newObject);
    for (let index = 0; index < newKeys.length; index++) {
      oldObject[newKeys[index]] = newObject[newKeys[index]];
    }
  }


  private renewList(objectDataToRenew: any[]) {
    const tempObjectData = objectDataToRenew;
    this.objectData = [];
      tempObjectData.forEach(objectToAdd => {
        this.objectData.push(objectToAdd);
      });
  }

  private checkForChanges(objectData) {
    this.renewList(objectData);
    this.changeDetectorRefs.detectChanges();
  }

  private sortDataWith(direction: string, columnToSort: string, objects: any[]): any[] {
    let sortableProperty: string;
    for (let index = 0; index < this.columnAttributes.length; index++) {
      if (this.columnAttributes[index].columnName === columnToSort) {
        sortableProperty = this.columnAttributes[index].attributeName;
        break;
      }
    }

    objects.sort((objectA: any, objectB: any) => {
      return this.compare(
        objectA,
        objectB,
        sortableProperty,
        (direction !== 'asc'));
    });
    return objects;
  }

  private compare(objectA: any, objectB: any, sortableProperty: string, isNotAsc: boolean): number {
    return (objectA[sortableProperty] < objectB[sortableProperty] ? -1 : 1) * (isNotAsc ? -1 : 1);
  }
}
