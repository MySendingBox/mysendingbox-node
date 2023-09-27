import fetch, { BodyInit, FormData, Headers, RequestInit } from 'node-fetch';
import { IConfig } from '../types/config.type.js';
import formatRequestBody from './body.helper.js';

class RequestHandler {
  private static instance: RequestHandler | null = null;
  private baseUrl: string;
  private timeout: number;
  private headers: Headers;

  private constructor({ host, apiKey, timeout }: IConfig) {
    this.baseUrl = host;
    this.timeout = timeout;
    this.headers = new Headers();
    this.headers.set('Authorization', `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`);
    this.headers.set('Accept', 'application/json');
  }
  
  static getInstance(config: IConfig) {
    if (!this.instance) {
      this.instance = new RequestHandler(config);
    }
    return this.instance;
  }

  private async fetchWithTimeout(path: string, options: RequestInit) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), this.timeout);
  
    const response = await fetch(path, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
  
    return response;
  } 

  private async fetch<T>(path: string, method: string, data?: unknown): Promise<T> {
    let formatedData: BodyInit | null | undefined

    if (data) {
      formatedData = await formatRequestBody(data);
    }
  
    const isMultipart = formatedData instanceof FormData;
    
    this.headers.set('Content-Type', isMultipart ? 'multipart/form-data' : 'application/json');

    const options: RequestInit = {
      method,
      headers: this.headers,
      body: data && method !== ('GET' || 'DELETE') ? formatedData : null,
    };

    const response = await this.fetchWithTimeout(this.baseUrl + path, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (isMultipart) {
      return await response.formData() as unknown as T;
    }

    return await response.json() as T;
  }

  async get(path: string) {
    return this.fetch(path, 'GET');
  }

  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    return this.fetch<T>(path, 'POST', body);
  }

  async put<T>(path: string, body: Record<string, unknown>): Promise<T> {
    return this.fetch<T>(path, 'PUT', body);
  }

  async delete(path: string): Promise<void> {
    return this.fetch(path, 'DELETE');
  }
}

export default RequestHandler;

