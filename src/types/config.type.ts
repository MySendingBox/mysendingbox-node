export interface IConfig {
  apiKey: string;
  apiVersion: string;
  host: string;
  timeout: number;
}

export interface IUserConfig extends Pick<IConfig, 'apiKey'> {
  apiVersion?: IConfig['apiVersion'];
  host?: IConfig['host'];
  timeout?: IConfig['timeout'];
}