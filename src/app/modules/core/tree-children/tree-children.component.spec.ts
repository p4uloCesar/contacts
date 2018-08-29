import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeChildrenComponent } from './tree-children.component';

describe('TreeChildrenComponent', () => {
  let component: TreeChildrenComponent;
  let fixture: ComponentFixture<TreeChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
