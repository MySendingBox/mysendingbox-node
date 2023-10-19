import { File } from "../types/File.js";

/** Invoice Payload */
export interface InvoicePayload {
  date_start: Date;
  date_end: Date;
  status: string;
  order_by: 'invoice_date' | 'invoice_number' | 'total';
  sort_by: 'asc' | 'desc';
  page: number;
  limit: number;
}

/** Invoice Response */
type InvoiceStatus = 'created' | 'waiting' | 'paid' | 'error';

type PaymentType = 'card' | 'sepa' | 'sepa_debit' | 'transfer';

type PaymentInformations = 'paid' | 'error' | 'error_code' | 'charge_created' | 'charge_receipt_url' | 'charge_type';

interface InvoiceLine {
  _id: string;
  text: string;
  tva: number;
  price: number;
  total_ht: number;
  total_tva: number;
  total_ttc: number;
}

interface InvoiceTotal {
  total_services_ht: number;
  total_postage_ht: number;
  total_ht: number;
  total_tva: number;
  total_ttc: number;
}

interface Discount {
  type: 'percentage' | 'amount';
  value: number;
  text: string;
  tva: number;
  price: number;
  total_ht: number;
}

export interface InvoiceResponse {
  _id: string;
  invoice_number: number;
  invoice_date: Date;
  due_date: Date;
  name: string;
  pack: string;
  status: InvoiceStatus;
  payment_date: Date;
  payment_type: PaymentType;
  payment_infomations: PaymentInformations;
  tva: number;
  country: string;
  invoice_lines: InvoiceLine[];
  total: InvoiceTotal[];
  discount: Discount;
  file: File;
}
