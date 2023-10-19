import { PostcardPayload, PostcardResponse } from '../entities/index.js';
import { IConfig } from '../types/config.type.js';
import { getErrorMessage } from '../utils/error.handler.js';
import RequestHandler from '../utils/fetch.helper.js';

export interface IPostcardService {
  create(postcardData: PostcardPayload): Promise<PostcardResponse>;
  findById(id: string): Promise<PostcardResponse | null>;
  findAll(): Promise<PostcardResponse[] | null>;
  delete(id: string): Promise<void>;
}

class PostcardService implements IPostcardService {
  private requestHandler: RequestHandler;

  constructor(config: IConfig) {
    this.requestHandler = RequestHandler.getInstance(config);
  }
  
  async create(postcardData: PostcardPayload): Promise<PostcardResponse> {
    try {
      return await this.requestHandler.post('/postcards', postcardData);
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }

  async findById(id: string): Promise<PostcardResponse | null> {
    try {
      const data = await this.requestHandler.get(`/postcards/${id}`);
      return data as PostcardResponse;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        throw new Error(`${error}: Postcard with id ${id} not found`);
      }
      throw error;
    }
  }

  async findAll(): Promise<PostcardResponse[] | null> {
    try {
      const data = await this.requestHandler.get('/postcards');
      return data as PostcardResponse[];
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.requestHandler.delete(`/postcards/${id}`);
    } catch (error) {
      getErrorMessage(error);
      throw error;
    }
  }
}

export default PostcardService;
