import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPhotoGroupComponent } from './pop-up-photo-group.component';

describe('PopUpPhotoGroupComponent', () => {
  let component: PopUpPhotoGroupComponent;
  let fixture: ComponentFixture<PopUpPhotoGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPhotoGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPhotoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
