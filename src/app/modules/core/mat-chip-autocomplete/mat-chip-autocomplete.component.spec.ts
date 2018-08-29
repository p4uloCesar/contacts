import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipAutocompleteComponent } from './mat-chip-autocomplete.component';

describe('MatChipAutocompleteComponent', () => {
  let component: MatChipAutocompleteComponent;
  let fixture: ComponentFixture<MatChipAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatChipAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatChipAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
