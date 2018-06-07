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
import { AuthGuard } from './components/app-routing/auth.guard';
import { RelationshipDialogComponent } from './dialogs/relationship-dialog/relationship-dialog.component';
import { ObjectDetailComponent } from './components/object-detail/object-detail.component';
import { MapComponent } from './components/location/map/map.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import { MatSelectSearchComponent } from './generics/mat-select-wrapper/mat-select-search/mat-select-search.component';
import { MatSelectWrapperComponent } from './generics/mat-select-wrapper/mat-select-wrapper.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { UsersPerAgeCategoryChartComponent } from './components/charts/users-per-age-category-chart/users-per-age-category-chart.component';
import { UsersRegisteredInTimeChartComponent } from './components/charts/users-registered-in-time-chart/users-registered-in-time-chart.component';
import { RatingsChartComponent } from './components/charts/ratings-chart/ratings-chart.component';
import { ResourceManagerComponent } from './components/resource-manager/resource-manager.component';

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
    SimpleTableComponent,
    MatSelectWrapperComponent,
    MatSelectSearchComponent,
    HomeComponent,
    ChartsComponent,
    UsersPerAgeCategoryChartComponent,
    UsersRegisteredInTimeChartComponent,
    RatingsChartComponent,
    ResourceManagerComponent
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
    }),
    ChartsModule
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
    SimpleTableComponent,
    MatSelectWrapperComponent,
    MatSelectSearchComponent,
    HomeComponent,
    ChartsComponent,
    UsersPerAgeCategoryChartComponent,
    UsersRegisteredInTimeChartComponent,
    RatingsChartComponent,
    ResourceManagerComponent
  ],
  providers: [
    Datastore,
    BaseService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
