import { BaseService } from './services/base/base.service';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationComponent } from './components/location/location.component';
import { AgmCoreModule } from '@agm/core';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { DataTableComponent } from './generics/data-table/data-table.component';
import { RelationshipDialogComponent } from './dialogs/relationship-dialog/relationship-dialog.component';
import { ObjectDetailComponent } from './components/object-detail/object-detail.component';
import { MapComponent } from './components/location/map/map.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';

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
    DataTableComponent,
    RelationshipDialogComponent,
    ObjectDetailComponent,
    WizardComponent,
    RemoveDialogComponent,
    SimpleTableComponent
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
    DataTableComponent,
    RelationshipDialogComponent,
    ObjectDetailComponent,
    WizardComponent,
    RemoveDialogComponent,
    SimpleTableComponent
  ],
  providers: [
    Datastore,
    BaseService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
