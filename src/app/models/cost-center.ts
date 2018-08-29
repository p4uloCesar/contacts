import {ModelBase} from './model-base';

export class CostCenter extends ModelBase {
  public category_type: string;
  public category: string;
  public name: string;
  public current: boolean;
  public erp_id : string;
}
