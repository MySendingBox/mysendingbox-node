import { InvoiceResponse } from '../entities/index.js';
import { IConfig } from '../types/config.type.js';
import { getErrorMessage } from '../utils/error.handler.js';
import RequestHandler from './../utils/fetch.helper.js';

export interface IInvoiceService {
  findById(id: string): Promise<InvoiceResponse | null>;
}

class InvoiceService implements IInvoiceService {
  private requestHandler: RequestHandler;

  constructor(config: IConfig) {
    this.requestHandler = RequestHandler.getInstance(config);
  }
  
  async findById(id: string): Promise<InvoiceResponse | null> {
    try {
      const data = await this.requestHandler.get(`/invoices/${id}`);
      return data as InvoiceResponse;
    } catch (error) {
      getErrorMessage(error)
      throw error;
    }
  }
}

export default InvoiceService;
