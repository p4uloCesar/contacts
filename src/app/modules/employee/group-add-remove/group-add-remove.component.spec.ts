import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddRemoveComponent } from './group-add-remove.component';

describe('GroupAddRemoveComponent', () => {
  let component: GroupAddRemoveComponent;
  let fixture: ComponentFixture<GroupAddRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
