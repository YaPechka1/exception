import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpVideoGroupComponent } from './pop-up-video-group.component';

describe('PopUpVideoGroupComponent', () => {
  let component: PopUpVideoGroupComponent;
  let fixture: ComponentFixture<PopUpVideoGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpVideoGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpVideoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
