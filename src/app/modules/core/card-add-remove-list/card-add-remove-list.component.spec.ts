import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveTableComponent } from './card-add-remove-list.component';

describe('AddRemoveTableComponent', () => {
  let component: AddRemoveTableComponent;
  let fixture: ComponentFixture<AddRemoveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
