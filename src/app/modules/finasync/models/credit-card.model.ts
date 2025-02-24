export interface ICreditCard {
  uuid?: string;
  card_holder_name: string;
  card_nickname?: string;
  card_number: string;
  bank_name?: string;
  card_type: 'VISA' | 'MASTERCARD' | 'AMEX' | 'OTHER';
  expiry_date: string;
  cvv: string;
  limit?: number;
  balance?: number;
  status?: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
}
