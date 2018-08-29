import { TestBed, inject } from '@angular/core/testing';

import { CostCenterService } from './cost-center.service';

describe('CostCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CostCenterService]
    });
  });

  it('should be created', inject([CostCenterService], (service: CostCenterService) => {
    expect(service).toBeTruthy();
  }));
});
