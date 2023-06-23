import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPhotoComponent } from './pop-up-photo.component';

describe('PopUpPhotoComponent', () => {
  let component: PopUpPhotoComponent;
  let fixture: ComponentFixture<PopUpPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
