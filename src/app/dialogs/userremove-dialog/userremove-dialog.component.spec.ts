import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemoveDialogComponent } from './userremove-dialog.component';

describe('UserRemoveDialogComponent', () => {
  let component: UserRemoveDialogComponent;
  let fixture: ComponentFixture<UserRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
