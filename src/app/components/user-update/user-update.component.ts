import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../../services/userService/user-service.service";
import {NgForm} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  protected user: User;
  protected birthdate: Date;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.userService.getSpecificUser(id).then((user: any) => {
          if (user) {
            this.user = user;
            this.birthdate = user.birthdate;
          } else {
            this.backToIndex();
          }
        });
      }
    });
  }

  private backToIndex(){
    this.router.navigate(['/users']);
  }

  saveChanges(){
    this.user.birthdate = new Date(this.birthdate);
    this.user.save().subscribe(success => this.backToIndex());
  }
}
