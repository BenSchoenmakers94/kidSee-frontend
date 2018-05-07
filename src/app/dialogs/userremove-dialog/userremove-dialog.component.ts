import { JsonApiModel } from 'angular2-jsonapi';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './userremove-dialog.component.html',
  styleUrls: ['./userremove-dialog.component.css']
})
export class UserRemoveDialogComponent implements OnInit {
  ngOnInit(): void { }

  constructor(public dialogRef: MatDialogRef<UserRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JsonApiModel, public abstractObjectService: AbstractObjectService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
    const specificObjectService = this.abstractObjectService.getObject(this.data.modelConfig.type);
    specificObjectService.deleteObject(this.data.id);
  }
}
