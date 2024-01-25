export interface IConfig {
  apiKey: string | undefined;
  apiVersion: string | undefined;
  host: string;
  timeout: number;
}

export interface IUserConfig extends Pick<IConfig, 'apiKey'> {
  apiVersion?: IConfig['apiVersion'];
  host?: IConfig['host'];
  timeout?: IConfig['timeout'];
}
