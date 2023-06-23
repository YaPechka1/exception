import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPeopleComponent } from './pop-up-people.component';

describe('PopUpPeopleComponent', () => {
  let component: PopUpPeopleComponent;
  let fixture: ComponentFixture<PopUpPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
