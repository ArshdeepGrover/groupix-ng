export interface IBillShare {
  id: number;
  share_amount: string;
  paid: boolean;
  user_id: number;
  bill_id: number;
  created_at: string;
  updated_at: string;
}

export interface IBillShareWithSum {
  bill_share: IBillShare[];
  sum: string;
}
