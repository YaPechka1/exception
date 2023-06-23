import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPeopleGroupComponent } from './pop-up-people-group.component';

describe('PopUpPeopleGroupComponent', () => {
  let component: PopUpPeopleGroupComponent;
  let fixture: ComponentFixture<PopUpPeopleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPeopleGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPeopleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
