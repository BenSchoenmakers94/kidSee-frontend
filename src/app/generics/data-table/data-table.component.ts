import { JsonApiModel } from 'angular2-jsonapi';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { CreateDialogComponent } from './../../dialogs/create-dialog/create-dialog.component';
import { ColumnAttribute } from './../column-attribute';
import { RemoveDialogComponent } from '../../dialogs/remove-dialog/remove-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import * as _ from 'lodash';
import { BaseService } from '../../services/base/base.service';

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

  objectData: any[];
  displayedColumns: string[];
  specificObjectService: BaseService;
  pageNumber: number;
  pageSize: number;
  pageSizeOptions = ('' + Array(20)).split(',').map(function() { return this[0]++; }, [1]);
  maxObjectsLengthInStorage: number;

  constructor(public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private abstractObjectService: AbstractObjectService) { }

  ngOnInit() {
    this.specificObjectService = this.abstractObjectService.getObject(this.objectType);
    this.pageNumber = 1;
    this.pageSize = 10;
    this.displayedColumns = [];
    this.objectData = [];
    this.initColumns();
    this.receiveAllData().then(result => {
      this.maxObjectsLengthInStorage = result.length;
      this.checkForChanges(result);
    });
   }

   ngAfterViewInit(): void {
    this.paginator.page.subscribe(next => {
      this.pageNumber = this.paginator._pageIndex + 1;
      this.pageSize = this.paginator.pageSize;
      this.receivePageData().then(result => {
        this.checkForChanges(result);
      });
    });
  }

  receiveAllData(): Promise<JsonApiModel[]> {
    return new Promise(resolve => {
      this.specificObjectService.getAllObjects().subscribe({
        next: objects => resolve(objects)
      });
    });
  }

  receivePageData(): Promise<JsonApiModel[]> {
    return new Promise(resolve => {
      this.specificObjectService.getObjectsPage(this.pageNumber, this.pageSize).subscribe({
        next: objects => resolve(objects)
      });
    });
  }

  initColumns() {
    this.columnAttributes.forEach(columnAttribute => {
      this.displayedColumns.push(columnAttribute.columnName);
    });
    this.displayedColumns.push('Actions');
  }

  getAttributeFromRow(object: any, column: string) {
    for (let index = 0; index < this.columnAttributes.length; index++) {
      if (this.columnAttributes[index].columnName === column) {
        return object[this.columnAttributes[index].attributeName];
      }
    }
  }

  handleAction(actionToDo: string, object: any) {
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


  createObject(objectToCreate: any) {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: objectToCreate //TODO - Update table
    });
  }

  startEdit(objectToEdit: any) {
    const tempObjectClone = _.cloneDeep(objectToEdit);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: tempObjectClone
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.returnObjectState(objectToEdit, tempObjectClone);
        this.checkForChanges(this.objectData);
       }
    });
  }

  remove(objectToRemove: any) {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      data: objectToRemove
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.objectData.splice(this.objectData.indexOf(objectToRemove), 1);
        this.checkForChanges(this.objectData);
      }
    });
  }

  returnObjectState(oldObject: any, newObject: any) {
    const newKeys = Object.keys(newObject);
    for (let index = 0; index < newKeys.length; index++) {
      oldObject[newKeys[index]] = newObject[newKeys[index]];
    }
  }


  renewList(objectDataToRenew: any[]) {
    const tempObjectData = objectDataToRenew;
    this.objectData = [];
      tempObjectData.forEach(objectToAdd => {
        this.objectData.push(objectToAdd);
      });
  }

  checkForChanges(objectData) {
    this.renewList(objectData);
    this.changeDetectorRefs.detectChanges();
  }
}
