import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPhotoAvatarGroupComponent } from './pop-up-photo-avatar-group.component';

describe('PopUpPhotoAvatarGroupComponent', () => {
  let component: PopUpPhotoAvatarGroupComponent;
  let fixture: ComponentFixture<PopUpPhotoAvatarGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPhotoAvatarGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPhotoAvatarGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
