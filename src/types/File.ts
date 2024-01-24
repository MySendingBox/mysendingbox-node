export type SourceFileType = 'file' | 'template_id' | 'remote' | 'html';

type FileType = 'file_to_send' | 'delivery_proof' | 'filing_proof' | 'lost_proof' | 'return_to_sender_proof' | 'download_proof' | 'rejection_proof' | 'negligence_proof';

export interface File {
  _id: string;
  url: string;
  user: string;
  postcard: string;
  letter: string;
  type: FileType;
  page_count: number;
  created_at: Date;
  updated_at: Date;
  /** @deprecated */
  path: string;
}