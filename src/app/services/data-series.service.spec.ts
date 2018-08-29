import { TestBed, inject } from '@angular/core/testing';

import { DataSeriesService } from './data-series.service';

describe('DataSeriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSeriesService]
    });
  });

  it('should be created', inject([DataSeriesService], (service: DataSeriesService) => {
    expect(service).toBeTruthy();
  }));
});
