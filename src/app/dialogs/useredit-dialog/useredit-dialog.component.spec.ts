import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditDialogComponent } from './useredit-dialog.component';

describe('UserEditDialogComponent', () => {
  let component: UserEditDialogComponent;
  let fixture: ComponentFixture<UserEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
