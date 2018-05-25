import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})
export class SimpleTableComponent implements OnInit {

  @Input() dataType: string;
  @Input() parentObject: BaseModel;

  public dataTypeLowercased: string;

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.dataTypeLowercased = this.dataType.toLowerCase();
  }

  public addNewObject() {
    const navUrl = this.parentObject.modelConfig.type + '/'
      + this.parentObject.id + '/'
      + this.dataTypeLowercased + '/new';
    this.router.navigate([navUrl]);
  }

  public showTypeDetails(object: BaseModel) {
    const navUrl = this.dataTypeLowercased + '/' + object.id;
    this.router.navigate([navUrl]);
  }

}
