import LetterService from './letters/LetterService.js';
import PostcardService from './postcards/PostcardService.js';
import InvoiceService from './invoices/InvoiceService.js';
import AccountService from './accounts/AccountService.js';
import { IConfig, IUserConfig } from './types/config.type.js';

const MYSENDINGBOX_DEFAULT_HOST = 'https://api.mysendingbox.fr';
const MYSENDINGBOX_DEFAULT_TIMEOUT = 120_000;
const MYSENDINGBOX_DEFAULT_VERSION = '1.0.0';

class Mysendingbox {
  private config: IConfig;
  public letter: LetterService;
  public postcard: PostcardService;
  public invoice: InvoiceService;
  public account: AccountService;

  constructor(config: IUserConfig) {
    this.config = {
      apiKey: config.apiKey,
      apiVersion: config.apiVersion || MYSENDINGBOX_DEFAULT_VERSION,
      host: config.host || MYSENDINGBOX_DEFAULT_HOST,
      timeout: config.timeout || MYSENDINGBOX_DEFAULT_TIMEOUT,
    };

    this.letter = new LetterService(this.config);
    this.invoice = new InvoiceService(this.config);
    this.account = new AccountService(this.config);
    this.postcard = new PostcardService(this.config);
  }
}

export default Mysendingbox;
