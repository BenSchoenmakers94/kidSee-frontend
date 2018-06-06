import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRegisteredInTimeChartComponent } from './users-registered-in-time-chart.component';

describe('UsersRegisteredInTimeChartComponent', () => {
  let component: UsersRegisteredInTimeChartComponent;
  let fixture: ComponentFixture<UsersRegisteredInTimeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRegisteredInTimeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRegisteredInTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
