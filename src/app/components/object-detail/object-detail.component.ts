import { Router } from '@angular/router';
import { AbstractObjectService } from './../../services/abstract-object.service';
import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../services/base/base.service';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.css']
})
export class ObjectDetailComponent implements OnInit {

  private objectType: string;
  private objectId: string;

  private specificObjectService: BaseService;
  public object: BaseModel;

  constructor(
    private abstractObjectService: AbstractObjectService,
    private router: Router) { }

  ngOnInit() {
    const routerSegments = this.router.url.split('/');
    this.objectId = routerSegments[routerSegments.length - 1];
    this.objectType = routerSegments[routerSegments.length - 2];

    this.specificObjectService = this.abstractObjectService.getObject(this.objectType);
    this.specificObjectService.getObjectFromId(this.objectId).subscribe(object => {
      this.object = object;
    });
  }

  public getIterableTypesOf(attributeName: string): string[] {
    const types = [];
    const typeRetrievalService = this.abstractObjectService.getObject(attributeName.toLowerCase());
    typeRetrievalService.getAllObjects().subscribe(retrievedTypes => {
      for (let index = 0; index < retrievedTypes.length; index++) {
        types.push(retrievedTypes[index]['name']);
      }
    });
    return types;
  }

}
