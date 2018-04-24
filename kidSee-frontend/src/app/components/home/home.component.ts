import { EditDialogComponent } from './../../dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from './../../models/location';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { CreateDialogComponent } from '../../dialogs/create-dialog/create-dialog.component';
import { RadialMenuComponent } from '../../menus/radial-menu/radial-menu.component';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  switchName: string;
  mapOn: Boolean;
  // google maps zoom level
  zoom = 17;

  // initial center position for the map - Avans
  lat = 51.689318;
  lng = 5.286887;

  markers: Marker[];
  locations: any[];

  constructor(private locationService: LocationService, private dialog: MatDialog) {
    this.markers = [];
    this.locations = [];
    this.mapOn = true;
    this.switchName = 'Lijst';
    this.receiveData();
   }

  ngOnInit(): void { }




  private receiveData() {
    this.markers = [];
    this.locations = [];
    this.locationService.getLocations().then(resolve => {
      this.locations = resolve;
      resolve.forEach(location => {
        this.markers.push({
          lat: location.lat,
          lng: location.lon,
          draggable: false
        });
      });
    });
  }

  private clickedMarker(marker: Marker) {
    this.getLocationFromMarker(marker).then(resolve => {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: resolve
      });
    }, reject => { });
  }

  private getLocationFromMarker(marker: Marker): Promise<any> {
    return new Promise((resolve, reject) => {
      this.locations.forEach(location => {
        if (location.lat === marker.lat) {
          if (location.lon === marker.lng) {
            resolve(location);
          }
        }
      });
      reject(null);
    });
  }

  private mapClicked($event: MouseEvent) {
    const newMarker = {
      lat: $event.coords.lat.toFixed(8),
      lng: $event.coords.lng.toFixed(8),
      label: 'NIEUW',
      draggable: false
    };
    this.markers.push(newMarker);
    this.getGeoLocation(newMarker).then(newLocation => {
      const dialogRef = this.dialog.open(CreateDialogComponent, {
        data: newLocation
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.locations.push(newLocation);
        } else {
          this.markers.pop();
        }
      });
    }, reject => {
      alert(reject);
    });
  }

  private markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  private switchToList() {
    this.receiveData();
    if (this.mapOn) {
      this.mapOn = false;
      this.switchName = 'Map';
    } else {
      this.mapOn = true;
      this.switchName = 'Lijst';
    }
  }

  getGeoLocation(marker: Marker): Promise<any> {
        if (navigator.geolocation) {
          const geocoder = new google.maps.Geocoder();
          const latlng = new google.maps.LatLng(marker.lat, marker.lng);
          const request = { latLng: latlng };

          return new Promise((resolve, reject) => {
          geocoder.geocode(request, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              const result = results[0];
              const rsltAdrComponent = result.address_components;
              const resultLength = rsltAdrComponent.length;
              if (result != null) {
                marker.buildingNum = rsltAdrComponent[0].short_name;
                marker.streetName = rsltAdrComponent[1].short_name;
                marker.cityName = rsltAdrComponent[2].short_name;
                marker.postalCode = rsltAdrComponent[6].short_name;
                resolve({
                  name: '',
                  lon: marker.lng,
                  lat: marker.lat,
                  description: '',
                  address: (marker.streetName + ' ' + marker.buildingNum +
                  ', ' + marker.postalCode + ' ' + marker.cityName)
                });
              } else {
                reject('No address available!');
              }
            }
          });
      });
    }
  }
}

interface Marker {
  lat: string;
  lng: string;
  buildingNum?: string;
  streetName?: string;
  cityName?: string;
  postalCode?: string;
  label?: string;
  draggable: boolean;
}
