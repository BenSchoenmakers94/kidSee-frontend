import { EditDialogComponent } from './../../dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from './../../models/location';
import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

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
          buildingNum: '',
          streetName: '',
          cityName: '',
          postalCode: '',
          draggable: false
        });
      });
    });
  }
  private clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  private mapClicked($event: MouseEvent) {
    console.log(this.markers);
    const newMarker = {
      lat: $event.coords.lat.toFixed(8),
      lng: $event.coords.lng.toFixed(8),
      buildingNum: '',
      streetName: '',
      cityName: '',
      postalCode: '',
      draggable: false
    };
    this.getGeoLocation(newMarker).then(newLocation => {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: newLocation
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          this.locations.push(newLocation);
          this.markers.push(newMarker);
          console.log(this.markers);
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
  buildingNum: string;
  streetName: string;
  cityName: string;
  postalCode: string;
  label?: string;
  draggable: boolean;
}
