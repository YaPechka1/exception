import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGroupComponent } from './pop-up-group.component';

describe('PopUpGroupComponent', () => {
  let component: PopUpGroupComponent;
  let fixture: ComponentFixture<PopUpGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
