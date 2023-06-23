import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMessagePlusPeopleComponent } from './pop-up-message-plus-people.component';

describe('PopUpMessagePlusPeopleComponent', () => {
  let component: PopUpMessagePlusPeopleComponent;
  let fixture: ComponentFixture<PopUpMessagePlusPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpMessagePlusPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpMessagePlusPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
