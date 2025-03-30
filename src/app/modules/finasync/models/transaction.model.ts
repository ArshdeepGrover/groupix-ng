export interface ITransaction {
  id: number;
  amount: number;
  transaction_type: 'credit' | 'debit';
  transaction_date: string;
  status: string;
  reference_number?: string;
  payment_method: string;
  description?: string;
  bank_account_id: number;
  category_id?: number;
}

export enum ETransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum ETransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum EPaymentMethod {
  UPI = 'UPI',
  CREDIT_CARD = 'credit_card',
  // DEBIT_CARD = 'debit_card',
  NET_BANKING = 'net_banking',
  // WALLET = 'wallet',
  // OTHER = 'other',
}
