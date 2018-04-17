import { Component, OnInit } from '@angular/core';
import { Datastore } from "../../services/datastore";
import { User } from "../../models/user";
import {UserService} from "../../services/userService/user-serivce.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];

  constructor(private userService: UserService) {
    this.userService.getUsers({}).subscribe(
      users => {
        users.getModels().forEach(user => {
          this.users.push(user);
        })
      }
    )
  }

  ngOnInit() {
  }

}
