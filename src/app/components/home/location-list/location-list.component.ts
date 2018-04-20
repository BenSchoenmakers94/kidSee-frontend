import { RemoveDialogComponent } from './../../../dialogs/remove-dialog/remove-dialog.component';
import { Location } from './../../../models/location';
import { EditDialogComponent } from './../../../dialogs/edit-dialog/edit-dialog.component';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  @Input() locations: any[];
  displayedColumns = ['Naam', 'Omschrijving', 'Adres', 'Acties'];
  constructor(public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
  }

  startEdit(location: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: location
    });
  }

  remove(location: any) {
    this.changeDetectorRefs.detach();
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      data: location
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.locations.splice(this.locations.indexOf(location), 1);
        const newLocations = this.locations;
        this.locations = [];
        newLocations.forEach(locationToAdd => {
          this.locations.push(locationToAdd);
        });
        this.changeDetectorRefs.markForCheck();
        this.changeDetectorRefs.detectChanges();
        this.changeDetectorRefs.reattach();
      }
    });
  }
}
