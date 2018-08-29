import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSeriesDialogComponent } from './data-series-dialog.component';

describe('DataSeriesDialogComponent', () => {
  let component: DataSeriesDialogComponent;
  let fixture: ComponentFixture<DataSeriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSeriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSeriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
