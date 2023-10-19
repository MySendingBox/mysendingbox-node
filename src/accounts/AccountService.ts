import { AccountPayload, AccountResponse } from '../entities/index.js';
import { IConfig } from '../types/config.type.js';
import { getErrorMessage } from '../utils/error.handler.js';
import RequestHandler from '../utils/fetch.helper.js';

export interface IAccountService {
  create(payload: AccountPayload): Promise<AccountResponse | null>;
  updateEmail(id: string, email: string): Promise<AccountResponse | null>;
}

class AccountService implements IAccountService {
  private requestHandler: RequestHandler;

  constructor(config: IConfig) {
    this.requestHandler = RequestHandler.getInstance(config);
  }

  async create(payload: AccountPayload): Promise<AccountResponse | null> {
    try {
      return await this.requestHandler.post<AccountResponse>('/accounts', payload);
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }  

  async updateEmail(id: string, email: string): Promise<AccountResponse | null> {
    try {
      const data = await this.requestHandler.put<AccountResponse>(`/accounts/${id}`, { email });
      return data;
    } catch (error) {
      getErrorMessage(error)
      throw error;
    }
  }
}

export default AccountService;
