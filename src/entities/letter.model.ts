import { Address, ElectronicAddress } from "../types/Address.js";
import { SourceFileType } from "../types/File.js";
import { Pricing } from "../types/Pricing.js";
import { File } from "../types/File.js";
import { TrackingEvent } from "../types/TrackingEvent.js";
import { Event } from "../types/Event.js";

type PaperPostageType = 'ecopli' | 'prioritaire' | 'lr' | 'lrar';

type ElectronicPostageType = 'ere' | 'lre' | 'email';

type PostageType = PaperPostageType | ElectronicPostageType;

/** Letter Payload */
type LetterPayload = Record<string, unknown> & {
  description?: string;
  color: 'bw' | 'color';
  source_file: NodeJS.ReadableStream | string;
  source_file_type: SourceFileType;
  source_file_2?: NodeJS.ReadableStream | string;
  source_file_2_type?: SourceFileType;
  source_file_3?: NodeJS.ReadableStream | string;
  source_file_3_type?: SourceFileType;
  source_file_4?: NodeJS.ReadableStream | string;
  source_file_4_type?: SourceFileType;
  source_file_5?: NodeJS.ReadableStream | string;
  source_file_5_type?: SourceFileType;
  send_date?: Date;
  variables?: {
    [key: string]: string;
  };
  metadata?: {
    [key: string]: string;
  };
};

export type ElectronicLetterPayload = LetterPayload & {
  to: ElectronicAddress;
  from?: ElectronicAddress;
  postage_type: ElectronicPostageType;
  content?: string;
  content_type?: 'text' | 'html';
};

export type PaperLetterPayload = LetterPayload & {
  to: Address;
  from?: Address;
  postage_type: PaperPostageType;
  both_sides?: boolean;
  staple?: boolean;
  address_placement?: 'first_page' | 'insert_blank_page';
  postage_speed?: 'express' | 'D' | 'D1';
  pdf_margin?: number;
  read_address_from_pdf?: boolean;
  manage_delivery_proof?: boolean;
  manage_returned_mail?: boolean;
  envelope?: 'c4' | 'c6';
  envelope_window?: 'simple' | 'double';
  print_sender_address?: boolean;
};

/** Letter Response */
export interface Letter {
  _id: string;
  channel: 'paper' | 'electronic';
  price: Pricing;
  from: Address | ElectronicAddress;
  to: Address | ElectronicAddress;
  page_count: keyof 'channel' extends 'electronic' ? 0 : number;
  sheet_count: keyof 'channel' extends 'electronic' ? 0 : number;
  file: File;
  source_file_type: SourceFileType;
  mode: 'test' | 'live';
  color: keyof 'channel' extends 'electronic' ? 'none' : 'bw' | 'color';
  both_sides: boolean;
  postage_type: PostageType;
  postage_speed: keyof 'channel' extends 'electronic' ? 'none' : 'express' | 'D' | 'D1';
  pdf_margin: number;
  manage_delivery_proof: boolean;
  manage_returned_mail: boolean;
  envelope_window: keyof 'channel' extends 'electronic' ? 'none' : 'simple' | 'double';
  mail_provider: keyof 'channel' extends 'electronic' ? 'equisign' | 'ar24' | 'postmark' : 'A' | 'B';
  print_sender_address: boolean;
  address_placement: keyof 'channel' extends 'electronic' ? 'none' : 'first_page' | 'insert_blank_page';
  envelope: keyof 'channel' extends 'electronic' ? 'none' : 'c4' | 'c6';
  staple: boolean;
  send_date: Date;
  delivery_proof: File;
  filing_proof: File;
  lost_proof: File;
  return_to_sender_proof: File;
  download_proof: File;
  rejection_proof: File;
  negligence_proof: File;
  tracking_events: TrackingEvent[];
  tracking_number: number;
  events: Event[];
  created_at: Date;
  updated_at: Date;
  user: string;
  error: boolean;
  wrong_address: boolean;
  created_from: 'api' | 'dashboard';
  object: 'letter'
  description: string;
  content: keyof 'channel' extends 'electronic' ? string : never;
  content_type: keyof 'channel' extends 'electronic' ? 'text' | 'html' : never;
  term_of_use_validation: keyof 'channel' extends 'electronic' ? boolean : never;
  variables: {
    [key: string]: string;
  };
  metadata: {
    [key: string]: string;
  };
}
