import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPhotoAvatarComponent } from './pop-up-photo-avatar.component';

describe('PopUpPhotoAvatarComponent', () => {
  let component: PopUpPhotoAvatarComponent;
  let fixture: ComponentFixture<PopUpPhotoAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPhotoAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPhotoAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
