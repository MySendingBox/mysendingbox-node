export type AccountPayload = Record<string, unknown> & {
  email: string;
  name: string;
  phone?: string;
  webhook_url?: string;
  company_name?: string;
  address_line1?: string;
  address_line2?: string;
  address_city?: string;
  address_postalcode?: string;
  address_country?: string;
  siren?: string;
  cancellation_window?: number;
}

export interface AccountResponse {
  user: {
    _id: string;
    admin: boolean;
    activated: boolean;
    email: string;
    name: string;
    phone: string;
    role: string;
    invite_pending: boolean;
    invite_token: string;
    compagny: string;
    created_at: Date;
    updated_at: Date;
    email_notification: {
      error: boolean;
      wrong_address: boolean;
    };
  };
  compagny: {
    partner: {
      can_create_account_from_api: boolean;
    };
    address: {
      name: string;
      address_line1: string;
      address_line2?: string;
      address_postalcode: string;
      address_city: string;
      address_country: string;
    };
    email_notifications: {
      error: boolean;
      wrong_address: boolean;
    };
    date_expiration: {
      basic: {
        type: string;
        value: number;
      }
      legal: {
        type: string;
        value: number;
      };
    };
    cancelation_window: {
      letters: number;
      postcards: number;
    };
    api_keys: {
      live: {
        key: string;
        created_at: Date;
      };
      test: {
        key: string;
        created_at: Date;
      };
    };
    integrations: {
      sellsy: {
          allowed: false;
          activated: false;
          initialized: false;
          rules: [];
      };
  };
  admin: false;
  activated: true;
  disable_webhook_for_dashboard_event: false;
  postage_speed: string;
  credit_card_exists: false;
  default_pack: string;
  auto_invoicing: true;
  billing_emails: [];
  _id: string;
  branded_for: string;
  webhook_url: string;
  email: string;
  siren: string;
  tva_intra: string;
  created_at: Date;
  updated_at: Date;
  };
}
