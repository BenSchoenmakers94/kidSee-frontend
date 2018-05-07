import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "../../../services/base/base.service";
import { AbstractObjectService } from "../../../services/abstract-object.service";

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {

  specificObjectService: BaseService;
  specificObjectName = 'users';
  user: any;
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private abstractObjectService: AbstractObjectService) { }

  ngOnInit() {
    this.specificObjectService = this.abstractObjectService.getObject(this.specificObjectName);
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.specificObjectService.getObjectFromId(id).subscribe((user: any) => {
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
