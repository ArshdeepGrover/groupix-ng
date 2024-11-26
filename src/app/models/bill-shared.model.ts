import { IUser } from "src/app/models/user.model";

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
  user_details: UserDetail[];
  total_sum: string;
}

export interface UserDetail {
  user: IUser;
  user_sum: string;
}