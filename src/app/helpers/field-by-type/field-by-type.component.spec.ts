import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldByTypeComponent } from './field-by-type.component';

describe('FieldByTypeComponent', () => {
  let component: FieldByTypeComponent;
  let fixture: ComponentFixture<FieldByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
