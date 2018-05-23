import { BaseService } from './../../services/base/base.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.css']
})
export class ObjectDetailComponent implements OnInit {

  private objectType: string;
  private objectId: string;

  public object: BaseModel;

  constructor(
    private baseService: BaseService,
    private router: Router) { }

  ngOnInit() {
    const routerSegments = this.router.url.split('/');
    this.objectId = routerSegments[routerSegments.length - 1];
    this.objectType = routerSegments[routerSegments.length - 2];

    this.baseService.getObjectFromId(this.objectId, this.objectType).subscribe(object => {
      this.object = object;
    });
  }

  public getIterableTypesOf(attributeName: string): string[] {
    const types = [];
    this.baseService.getAllObjects(attributeName).subscribe(retrievedTypes => {
      for (let index = 0; index < retrievedTypes.length; index++) {
        types.push(retrievedTypes[index]['name']);
      }
    });
    return types;
  }

}
