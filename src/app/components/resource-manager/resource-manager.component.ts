import { BaseService } from './../../services/base/base.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.css']
})
export class ResourceManagerComponent {

  constructor(
    private router: Router,
    private baseService: BaseService) { }

  public getResources(): string[] {
    const resourceNames: string[] = [];

    this.baseService.getModelTypes().forEach(modelType => {
      resourceNames.push(modelType.type);
    });

    return resourceNames;
  }

  public navigateTo(name: string) {
    this.router.navigate([name]);
  }
}
