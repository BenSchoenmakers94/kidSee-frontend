import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/userService/user-service.service";

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {
  user: any;
  sub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.userService.getSpecificUser(id).then((user: any) => {
          if (user) {
            this.user = user;
          } else {
            this.router.navigate(['/users']);
          }
        });
      }
    });
  }


}
