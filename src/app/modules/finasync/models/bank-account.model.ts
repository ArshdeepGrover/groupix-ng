export interface IBankAccount {
  id: number;
  account_number: number;
  account_holder_name: string;
  bank_name: string;
  ifsc_code: string;
  balance: number;
  currency: string;
  status: EBankAccountStatus;
  account_type: EBankAccountType;
  branch_name: any;
  is_primary: boolean;
  account_nickname: string;
  created_at: Date;
  updated_at: Date;
  uuid: string;
  masked_account_number: number;
}

export enum EBankAccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  closed = 'closed',
}

export enum EBankAccountType {
  SAVINGS = 'savings',
  CURRENT = 'current',
  SALARY = 'salary',
  WALLET = 'wallet',
  BUSINESS = 'business',
}
