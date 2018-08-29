import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConfigurationEditComponent } from './profile-configuration-edit.component';

describe('ProfileConfigurationEditComponent', () => {
  let component: ProfileConfigurationEditComponent;
  let fixture: ComponentFixture<ProfileConfigurationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConfigurationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConfigurationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
