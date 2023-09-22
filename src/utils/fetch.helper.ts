import fetch, { FormData, Headers } from 'node-fetch';
import { IConfig } from '../types/config.type';
import formatRequestBody from './body.helper';

class RequestHandler {
  private static instance: RequestHandler | null = null;
  private baseUrl: string;
  private headers: Headers;

  private constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.headers = new Headers();
    this.headers.set('Authorization', `Basic ${apiKey} `)
  }
  
  static getInstance(config: IConfig) {
    if (!this.instance) {
      this.instance = new RequestHandler(config.host, config.apiKey);
    }
    return this.instance;
  }

  private async fetch<T>(path: string, method: string, data?: unknown): Promise<T> {
    const formatedData = formatRequestBody(data);
    const isMultipart = formatedData instanceof FormData;
    const options = {
      method,
      headers: [
        ...this.headers,
        'Accept: application/json',
        ...(data && method !== 'GET' ? isMultipart ? ['Content-Type: multipart/form-data'] : ['Content-Type: application/json'] : []),
      ],
      body: data && method !== 'GET' ? formatedData : undefined,
    };

    const response = await fetch(path, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (isMultipart) {
      return response.formData() as unknown as T;
    }

    return response.json() as T;
  }

  async get(path: string) {
    return this.fetch(path, 'GET');
  }

  async post<T>(path: string, body: Record<string, unknown>) {
    return this.fetch<T>(path, 'POST', body);
  }

  async delete(path: string) {
    return this.fetch(path, 'DELETE');
  }
}

export default RequestHandler;

