export interface IBill {
  id: number;
  description: string;
  currency_type: string;
  amount: string;
  payer_id: number;
  divide_equally: boolean;
  date: string;
  user_id: number;
  group_id: number;
  created_at: string;
  updated_at: string;
  currency_type_symbol: string;
}

export interface IBillGraph {
  date: Date;
  total_amount: string;
  currency_symbol: string;
  total: number;
}
