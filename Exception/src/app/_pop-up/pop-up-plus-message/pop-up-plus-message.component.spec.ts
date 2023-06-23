import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPlusMessageComponent } from './pop-up-plus-message.component';

describe('PopUpPlusMessageComponent', () => {
  let component: PopUpPlusMessageComponent;
  let fixture: ComponentFixture<PopUpPlusMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPlusMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPlusMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
