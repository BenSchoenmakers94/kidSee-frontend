import { AbstractObjectService } from './services/abstract-object.service';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { Datastore } from './services/datastore';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';
import { LoginComponent } from './components/login/login.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './components/app-routing/app-routing.module';
import { UserService } from './services/userService/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationComponent } from './components/location/location.component';
import { AgmCoreModule } from '@agm/core';
import { LocationService } from './services//locationService/location.service';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { CreateDialogComponent } from './dialogs/create-dialog/create-dialog.component';
import { DataTableComponent } from './generics/data-table/data-table.component';
import { UserEditDialogComponent } from './dialogs/useredit-dialog/useredit-dialog.component';
import { UserCreateDialogComponent } from './dialogs/usercreate-dialog/usercreate-dialog.component';
import { UserRemoveDialogComponent } from './dialogs/userremove-dialog/userremove-dialog.component';
import { RelationshipDialogComponent } from './dialogs/relationship-dialog/relationship-dialog.component';
import { ObjectDetailComponent } from './components/object-detail/object-detail.component';
import { MapComponent } from './components/location/map/map.component';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: []
})
export class AngularMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocationComponent,
    MapComponent,
    EditDialogComponent,
    RemoveDialogComponent,
    CreateDialogComponent,
    DataTableComponent,
    UserEditDialogComponent,
    UserCreateDialogComponent,
    UserRemoveDialogComponent,
    RelationshipDialogComponent,
    ObjectDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JsonApiModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFDAhXM4QGRxQIUJBV3702hUnYdm-p4w0'
    })
  ],
  entryComponents: [
    AppComponent,
    LoginComponent,
    EditDialogComponent,
    RemoveDialogComponent,
    CreateDialogComponent,
    DataTableComponent,
    UserEditDialogComponent,
    UserCreateDialogComponent,
    UserRemoveDialogComponent,
    RelationshipDialogComponent,
    ObjectDetailComponent
  ],
  providers: [
    Datastore,
    UserService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LocationService,
    AbstractObjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
