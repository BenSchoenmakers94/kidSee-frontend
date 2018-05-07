import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { User } from "../../../models/user";
import { BaseService } from "../../../services/base/base.service";
import { AbstractObjectService } from "../../../services/abstract-object.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  specificObjectService: BaseService;
  specificObjectName = 'users';
  protected user: User;
  protected birthdate: Date;
  private sub: Subscription;

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
