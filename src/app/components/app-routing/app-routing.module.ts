import { DataTableComponent } from './../../generics/data-table/data-table.component';
import { MapComponent } from './../location/map/map.component';
import { LocationComponent } from './../location/location.component';
import { ObjectDetailComponent } from './../object-detail/object-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { WizardComponent } from '../wizard/wizard.component';
import { AuthGuard } from './auth.guard';
import { ResourceManagerComponent } from '../resource-manager/resource-manager.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'resources',
    component: ResourceManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    component: LocationComponent,
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
    path: 'assignment-types',
    canActivate: [AuthGuard],
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
    path: 'answers',
    canActivate: [AuthGuard],
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
    path: 'answer-types',
    canActivate: [AuthGuard],
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
    path: 'content-types',
    canActivate: [AuthGuard],
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
    path: 'statuses',
    canActivate: [AuthGuard],
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
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
  providers: [
    AuthGuard
  ]

})
export class AppRoutingModule { }
