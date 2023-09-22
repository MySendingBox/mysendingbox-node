import { IConfig } from './types/config.type';

const MYSENDINGBOX_HOST = 'https://api.mysendingbox.fr/';

class Mysendingbox {
  private config: IConfig;

  constructor(config: IConfig) {
    this.config = {
      apiKey: config.apiKey,
      apiVersion: config.apiVersion,
      host: config.host || MYSENDINGBOX_HOST,
    };
  }
}

export default Mysendingbox;
