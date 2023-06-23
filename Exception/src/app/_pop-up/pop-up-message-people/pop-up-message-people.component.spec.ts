import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMessagePeopleComponent } from './pop-up-message-people.component';

describe('PopUpMessagePeopleComponent', () => {
  let component: PopUpMessagePeopleComponent;
  let fixture: ComponentFixture<PopUpMessagePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpMessagePeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpMessagePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
