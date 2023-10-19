import { Address, ElectronicAddress } from "../types/Address.js";
import { File, SourceFileType } from "../types/File.js";
import { ReadableStream } from "node:stream/web";

/** Postcard Payload */
export type PostcardPayload = Record<string, unknown> & {
  description: string;
  to: Address | ElectronicAddress;
  source_file_front: ReadableStream | string;
  source_file_front_type: SourceFileType;
  source_file_back: ReadableStream | string;
  source_file_back_type: SourceFileType;
  variables?: Record<string, string>;
  metadata?: {
    [key: string]: string;
  };
}

/** Postcard Response */
export interface PostcardResponse {
  id: string;
  description: string;
  to: Address | ElectronicAddress;
  file: File;
  mail_provider: string;
  // send_date: Date; Not implemented yet
  events: Event[];
  created_at: string;
  updated_at: string;
  variables: Record<string, string>;
  metadata: {
    [key: string]: string;
  };
}
