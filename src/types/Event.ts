export interface Event {
  _id: string;
  updated_at: Date;
  created_at: Date;
  name: string;
  category: string;
  description: string;
  letter: string;
  user: string;
  webhook_last_error_message : string;
  webhook_failed: boolean;
  webhook_called: boolean;
}