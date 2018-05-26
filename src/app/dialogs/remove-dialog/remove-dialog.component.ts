import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  ngOnInit(): void { }
  constructor(public dialogRef: MatDialogRef<RemoveDialogComponent>) { }


    submit() { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    remove() {
      this.dialogRef.close(1);
    }
  }
