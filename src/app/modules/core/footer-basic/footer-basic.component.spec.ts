import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBasicComponent } from './footer-basic.component';

describe('FooterBasicComponent', () => {
  let component: FooterBasicComponent;
  let fixture: ComponentFixture<FooterBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
