export interface Address {
  name?: string;
  company?: string; // paper and electronic letter
  address_line1: string;
  address_line2?: string;
  address_line3?: string;
  address_city: string;
  address_postalcode: string;
  address_country: string;
}

export interface ElectronicAddress {
  name?: string;
  company?: string; // paper and electronic letter
  status?: string; // electronic letter only
  email: string; // electronic letter only
  first_name?: string; // electronic letter only
  last_name?: string; // electronic letter only
  reply_to?: string; // electronic letter only
}