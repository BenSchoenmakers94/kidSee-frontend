import { DataTableComponent } from './../../generics/data-table/data-table.component';
import { MapComponent } from './../location/map/map.component';
import { LocationComponent } from './../location/location.component';
import { ObjectDetailComponent } from './../object-detail/object-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { WizardComponent } from '../wizard/wizard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'locations',
    component: LocationComponent,
    children: [{
      path: '', component: MapComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: 'list', component: DataTableComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent,
      children: [{
        path: 'themes/new', component: WizardComponent
      }]
    }]
  },
  {
    path: 'users',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent,
      children: [{
        path: 'posts/new', component: WizardComponent
      }]
    }]
  }, {
    path: 'location-types',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id', component: ObjectDetailComponent
    }]
  },
  {
    path: 'posts',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent
    }]
  },
  {
    path: 'themes',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent
    }]
  },
  {
    path: 'comments',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent
    }]
  },
  {
    path: 'assignments',
    children: [{
      path: '', component: DataTableComponent
    }, {
      path: 'new', component: WizardComponent
    }, {
      path: ':id',
      component: ObjectDetailComponent
    }]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
