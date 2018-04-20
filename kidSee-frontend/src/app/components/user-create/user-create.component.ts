import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/userService/user-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user : any = {};

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  save(form: NgForm){
    this.userService.createUser(form).subscribe(result => {
      this.router.navigate(['/users']);
    })
  }



}
