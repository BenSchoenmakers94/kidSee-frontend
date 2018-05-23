import { AbstractObjectService } from './../../services/abstract-object.service';
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

  ngOnInit(): void {
    if (this.data['id']) {
      this.isDataAvailable = true;
    }
   }
  constructor(public dialogRef: MatDialogRef<RelationshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BaseModel, public abstractObjectService: AbstractObjectService) { }

    onOkClick(): void {
      this.dialogRef.close();
    }
  }
