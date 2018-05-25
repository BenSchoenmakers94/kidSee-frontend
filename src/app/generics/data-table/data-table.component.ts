import { ColumnAttribute } from './../column-attribute';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatInput } from '@angular/material';
import * as _ from 'lodash';
import { BaseService } from '../../services/base/base.service';
import { BaseModel } from '../../models/baseModel';
import { RelationshipDialogComponent } from '../../dialogs/relationship-dialog/relationship-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements AfterViewInit, OnInit {
  public objectType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) filterInput: MatInput;

  public objectData: any[];
  private objectDataLocalFiltered: any[];
  public displayedColumns: ColumnAttribute[];
  public pageNumber: number;
  public pageSize: number;
  public pageSizeOptions = ('' + Array(20)).split(',').map(function () { return this[0]++; }, [1]);
  public maxObjectsLengthInStorage: number;
  private maxObjectsLengthInStorageCopy: number;
  public objectAttributes: string[];
  public objectDetailVisible: boolean;

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private baseService: BaseService,
    private router: Router) { }

  ngOnInit() {
    const routerSegments = this.router.url.split('/');
    this.objectType = routerSegments[routerSegments.indexOf('') + 1];
    this.objectDetailVisible = false;
    this.pageNumber = 1;
    this.pageSize = 10;
    this.displayedColumns = [];
    this.objectData = [];
    this.objectDataLocalFiltered = [];
    this.receiveAllData().then(result => {
      this.initColumns(result[0]);
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
    const localPageData = returnableObjects.slice(startIndex, endIndex);
    return localPageData;
  }

  private receiveAllData(): Promise<BaseModel[]> {
    return new Promise(resolve => {
      this.baseService.getAllObjects(this.objectType).subscribe({
        next: objects => {
          resolve(objects);
          this.maxObjectsLengthInStorageCopy = objects.length;
        }
      });
    });
  }

  private receivePageData(pageNumber: number, pageSize: number): Promise<BaseModel[]> {
    return new Promise(resolve => {
      this.baseService.getObjectsPage(pageNumber, pageSize).subscribe({
        next: objects => resolve(objects)
      });
    });
  }

  private initColumns(object: BaseModel) {
    const attributeNames = object.getAttributeNames();
    this.objectAttributes = attributeNames;
    for (let index = 0; index < attributeNames.length; index++) {
      this.displayedColumns.push({
        columnName: attributeNames[index],
        displayed: true
      });
    }
  }

  public getDisplayedColumns(): string[] {
    const columnNames = [];
    for (let index = 0; index < this.displayedColumns.length; index++) {
      if (this.displayedColumns[index].displayed) {
        columnNames.push(this.displayedColumns[index].columnName);
      }
    }
    return columnNames;
  }

  public changeDisplayedColumns(column: string) {
    for (let index = 0; index < this.displayedColumns.length; index++) {
      if (this.displayedColumns[index].columnName === column) {
        this.displayedColumns[index].displayed = !this.displayedColumns[index].displayed;
      }
    }
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

  private compareValues(object: BaseModel, lowerCasedValue: string): boolean {
    return object.hasValue(lowerCasedValue);
  }

  private getAttributeFromRow(object: BaseModel, column: string): string {
    return object.resolveAttributeName(column);
  }

  public showRelationshipDialog(object: BaseModel, columnName: string) {
    const relationshipDataToShow = object[columnName.toLowerCase()];
    const dialogRef = this.dialog.open(RelationshipDialogComponent, {
      data: {
        parentObject: object,
        dataToShow: relationshipDataToShow,
        hasMany: !object.isBelongsToRelationship(columnName),
        attribute: columnName
      }
    });
  }

  public showObjectDetailPage(object: BaseModel) {
    this.objectDetailVisible = true;
    const routerUrl = this.objectType + '/' + object.id;
    this.router.navigate([routerUrl]);
  }

  public createNewObject() {
    const routerUrl = this.objectType + '/new';
    this.router.navigate([routerUrl]);
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

  private sortDataWith(direction: string, columnToSort: string, objects: BaseModel[]): any[] {
    objects.sort((objectA: any, objectB: any) => {
      return this.compare(
        objectA,
        objectB,
        columnToSort,
        (direction !== 'asc'));
    });
    return objects;
  }

  private compare(objectA: BaseModel, objectB: BaseModel, sortableProperty: string, isNotAsc: boolean): number {
    return (objectA.resolveAttributeName(sortableProperty) < objectB.resolveAttributeName(sortableProperty) ? -1 : 1) * (isNotAsc ? -1 : 1);
  }
}
