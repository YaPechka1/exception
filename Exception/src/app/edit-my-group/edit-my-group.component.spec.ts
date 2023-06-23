import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyGroupComponent } from './edit-my-group.component';

describe('EditMyGroupComponent', () => {
  let component: EditMyGroupComponent;
  let fixture: ComponentFixture<EditMyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMyGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
