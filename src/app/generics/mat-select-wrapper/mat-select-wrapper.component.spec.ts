import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSelectWrapperComponent } from './mat-select-wrapper.component';

describe('MatSelectWrapperComponent', () => {
  let component: MatSelectWrapperComponent;
  let fixture: ComponentFixture<MatSelectWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSelectWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSelectWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
