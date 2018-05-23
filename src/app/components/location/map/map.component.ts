import { Observable } from 'rxjs/Observable';
import { ColumnAttribute } from './../../../generics/column-attribute';
import { AbstractObjectService } from './../../../services/abstract-object.service';
import { EditDialogComponent } from './../../../dialogs/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material';
import { Location } from './../../../models/location';
import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { CreateDialogComponent } from '../../../dialogs/create-dialog/create-dialog.component';
import { BaseService } from '../../../services/base/base.service';

declare var google: any;

@Component({
  selector: 'app-location-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom = 17;

  // initial center position for the map - Avans
  lat = 51.689318;
  lng = 5.286887;

  markers: Marker[];
  locations: any[];

  specificObjectService: BaseService;
  specificObjectName = 'locations';

  constructor(
    private abstractObjectService: AbstractObjectService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.specificObjectService = this.abstractObjectService.getObject(this.specificObjectName);
    this.markers = [];
    this.locations = [];
    this.receiveData();
  }

  private receiveData() {
    this.markers = [];
    this.locations.length = 0;
    this.specificObjectService.getAllObjects().subscribe({
      next: locations =>
      locations.forEach(location => {
        this.locations.push(location);
        let specificIconUrl = 'plain';
        if (location['location-type']) {
          specificIconUrl = location['location-type'].name;
        }
        this.markers.push({
          lat: location.lat,
          lng: location.lon,
          iconUrl: '../../../../assets/imgs/icon_' + specificIconUrl + '.png',
          draggable: false
        });
      })
    });
  }

  private clickedMarker(marker: Marker) {
    this.getLocationFromMarker(marker).then(resolve => {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: resolve
      });
    }, reject => { });
  }

  public getLocationFromMarker(marker: Marker): Promise<any> {
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
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      iconUrl: '../../../../assets/imgs/coins.png',
      draggable: false
    };
    this.markers.push(newMarker);
    this.getGeoLocation(newMarker).then(newLocation => {
      newLocation.modelConfig.type = 'locations';
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
                  ', ' + marker.postalCode + ' ' + marker.cityName),
                  modelConfig: {}
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
  lat: number;
  lng: number;
  buildingNum?: string;
  streetName?: string;
  cityName?: string;
  postalCode?: string;
  label?: string;
  draggable: boolean;
  iconUrl: string;
  visible?: boolean;
}
