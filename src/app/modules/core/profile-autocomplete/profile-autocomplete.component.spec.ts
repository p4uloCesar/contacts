import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAutocompleteComponent } from './profile-autocomplete.component';

describe('ProfileAutocompleteComponent', () => {
  let component: ProfileAutocompleteComponent;
  let fixture: ComponentFixture<ProfileAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
