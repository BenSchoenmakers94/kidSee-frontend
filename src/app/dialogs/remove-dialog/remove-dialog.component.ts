import { JsonApiModel } from 'angular2-jsonapi';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { LocationService } from './../../services/location.service';
import { Location } from './../../models/location';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {
  ngOnInit(): void { }

  constructor(public dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JsonApiModel, public abstractObjectService: AbstractObjectService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data);
    const specificObjectService = this.abstractObjectService.getObject(this.data.modelConfig.type);
    specificObjectService.deleteObject(this.data.id);
  }
}
