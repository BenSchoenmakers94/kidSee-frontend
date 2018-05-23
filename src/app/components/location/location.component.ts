import { Observable } from 'rxjs/Observable';
import { ColumnAttribute } from './../../generics/column-attribute';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { EditDialogComponent } from './../../dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from './../../models/location';
import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';
import { BaseService } from '../../services/base/base.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operator/map';

declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  switchName: string;
  mapOn: Boolean;
  specificObjectName = 'locations';

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.mapOn = true;
    this.switchName = 'Lijst';
  }

  private switchToList() {
    let navigateTo = this.specificObjectName;
    if (this.mapOn) {
      navigateTo += '/list';
    } else {
      navigateTo += '';
    }
    this.mapOn = !this.mapOn;
    this.router.navigate([navigateTo]);
  }
}
