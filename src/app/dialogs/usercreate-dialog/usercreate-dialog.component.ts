import { JsonApiModel } from 'angular2-jsonapi';
import { Datastore } from './../../services/datastore';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AbstractObjectService } from '../../services/abstract-object.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './usercreate-dialog.component.html',
  styleUrls: ['./usercreate-dialog.component.css']
})
export class UserCreateDialogComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit(): void { }
  constructor(public dialogRef: MatDialogRef<UserCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public abstractObjectService: AbstractObjectService) { }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }

    submit() { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    stopEdit(): void {
      const specificObjectService = this.abstractObjectService.getObject(this.data.modelConfig.type);
      specificObjectService.postObject(this.data);
    }
  }
