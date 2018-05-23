import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
