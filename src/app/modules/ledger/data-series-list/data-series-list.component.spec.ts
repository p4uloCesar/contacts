import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSeriesListComponent } from './data-series-list.component';

describe('DataSeriesListComponent', () => {
  let component: DataSeriesListComponent;
  let fixture: ComponentFixture<DataSeriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSeriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSeriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
