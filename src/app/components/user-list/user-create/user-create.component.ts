import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseService } from "../../../services/base/base.service";
import { AbstractObjectService } from "../../../services/abstract-object.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  specificObjectService: BaseService;
  specificObjectName = 'users';

  user : any = {};

  constructor(private abstractObjectService: AbstractObjectService,
              private router: Router) { }

  ngOnInit() {

    this.specificObjectService = this.abstractObjectService.getObject(this.specificObjectName);
  }

  save(form: NgForm){

    this.specificObjectService.postObject(form);
  }



}
