import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerAgeCategoryChartComponent } from './users-per-age-category-chart.component';

describe('UsersPerAgeCategoryChartComponent', () => {
  let component: UsersPerAgeCategoryChartComponent;
  let fixture: ComponentFixture<UsersPerAgeCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPerAgeCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPerAgeCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
