import { EGender } from 'src/app/enums/gender.enum';

export interface IUser {
  login_at: Date;
  sign_in_count: number;
  id: number;
  email: string;
  name: string;
  active: boolean;
  created_by_user_id: number;
  failed_attempts: number;
  phone: number;
  county_code: string;
  location: string;
  timezone: string;
  dob: Date;
  gender: EGender;
  avatar: any;
  username: string;
  created_at: Date;
  reset_token: string;
  reset_token_expires_at: string;
  user_auth_token: string;
}
