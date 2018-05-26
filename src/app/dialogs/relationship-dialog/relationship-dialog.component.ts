import { Datastore } from './../../services/datastore';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-relationship-dialog',
  templateUrl: './relationship-dialog.component.html',
  styleUrls: ['./relationship-dialog.component.css']
})
export class RelationshipDialogComponent implements OnInit {
  public isDataAvailable: boolean;
  public hasMany: boolean;
  public parentObject: BaseModel;
  public attribute: string;
  public displayData: BaseModel;

  ngOnInit(): void {
    if (this.data) {
      this.isDataAvailable = true;
      this.hasMany = this.data['hasMany'];
      this.parentObject = this.data['parentObject'];
      this.attribute = this.data['attribute'];
      if (!this.hasMany) {
        this.displayData = this.data['dataToShow'];
      }
    }
  }
  constructor(public dialogRef: MatDialogRef<RelationshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onOkClick(): void {
      this.dialogRef.close();
    }
  }
