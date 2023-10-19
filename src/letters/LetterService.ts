import { ElectronicLetterPayload, Letter, PaperLetterPayload } from '../entities/letter.model.js';
import { IConfig } from '../types/config.type.js';
import { getErrorMessage } from '../utils/error.handler.js';
import RequestHandler from '../utils/fetch.helper.js';

export interface ILetterService {
  create(channel: 'paper' | 'electronic', letterData: PaperLetterPayload | ElectronicLetterPayload): Promise<Letter>;
  findById(id: string): Promise<Letter | null>;
  findAll(): Promise<Letter[] | null>;
  delete(id: string): Promise<void>;
}

class LetterService implements ILetterService {
  private requestHandler: RequestHandler;

  constructor(config: IConfig) {
    this.requestHandler = RequestHandler.getInstance(config);
  }
  
  async create(channel: 'paper' | 'electronic', letterData: PaperLetterPayload | ElectronicLetterPayload): Promise<Letter> {
    try {
      return await this.requestHandler.post<Letter>(`/letters/${channel}`, letterData);
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }

  async findById(id: string): Promise<Letter | null> {
    try {
      const data = await this.requestHandler.get(`/letters/${id}`);
      return data as Letter;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new Error(`${error}: Letter with id ${id} not found`);
      }
      throw error;
    }
  }

  async findAll(): Promise<Letter[] | null> {
    try {
      const data = await this.requestHandler.get(`/letters`);
      return data as Letter[];
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.requestHandler.delete(`/letters/${id}`);
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }
}

export default LetterService;