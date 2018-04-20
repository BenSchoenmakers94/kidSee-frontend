import { Location } from './../../models/location';
import { LocationService } from './../../services/location.service';
import { Datastore } from './../../services/datastore';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit(): void { }
  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Location, public locationService: LocationService) { }

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
      this.locationService.postLocations(this.data);
    }
  }
