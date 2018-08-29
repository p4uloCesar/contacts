import {ModelBase} from "./model-base";
import {DataSeries} from "./data-series";
import {CostCenter} from "./cost-center";

export class Ledger extends ModelBase{
  posting_date: Date;
  posting_period: string;
  account_id: string;
  document_type: string;
  document_number: string;
  local_currency: string;
  amount: string;
  text: string;
  reference: string;

// Relationship Fields
  data_series: number;
  data_series_obj: DataSeries[] = [];
  cost_center: CostCenter;
  cost_center_obj: CostCenter[] = [];

}
