import { CostCenterModule } from './cost-center.module';

describe('CostCenterModule', () => {
  let costCenterModule: CostCenterModule;

  beforeEach(() => {
    costCenterModule = new CostCenterModule();
  });

  it('should create an instance', () => {
    expect(costCenterModule).toBeTruthy();
  });
});
