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
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: LocationService) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
  this.dataService.deleteLocation(this.data);
  }
}
