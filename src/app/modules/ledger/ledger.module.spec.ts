import { LedgerModule } from './ledger.module';

describe('LedgerModule', () => {
  let actualExpensesModule: LedgerModule;

  beforeEach(() => {
    actualExpensesModule = new LedgerModule();
  });

  it('should create an instance', () => {
    expect(actualExpensesModule).toBeTruthy();
  });
});
