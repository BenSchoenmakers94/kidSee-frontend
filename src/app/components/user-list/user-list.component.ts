import { Component, OnInit } from '@angular/core';
import { BaseService } from "../../services/base/base.service";
import { ColumnAttribute } from "../../generics/column-attribute";
import { AbstractObjectService } from "../../services/abstract-object.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  specificObjectService: BaseService;
  specificObjectName = 'users';
  columnAttributes: ColumnAttribute[];
  actionsForTable: string[];

  users: any = [];

  constructor(private abstractObjectService: AbstractObjectService) {

  }

  private initTableInformation() {
    this.actionsForTable = [];
    this.columnAttributes = [];

    this.actionsForTable.push(...['edit', 'delete']);

    this.columnAttributes.push({
      columnName: 'Gebruikersnaam',
      attributeName: 'username'
    });
    this.columnAttributes.push({
      columnName: 'Geboortedatum',
      attributeName: 'birthdate'
    });
  }

  ngOnInit() {
    this.specificObjectService = this.abstractObjectService.getObject(this.specificObjectName);
    this.specificObjectService.getAllObjects().subscribe({
      next: users =>
        users.forEach(user => {
          this.users.push(user);
        })
    });
    this.initTableInformation();
  }

  delete(id, index){
    this.specificObjectService.deleteObject(id).subscribe(() => this.users.splice(index, 1));
  }

}
