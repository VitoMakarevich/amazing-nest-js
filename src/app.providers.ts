import { Client } from 'elasticsearch';

export const ELASTIC_CONNECTION = 'ElasticConnection'
export const ElasticConnectionProvider = {
  provide: ELASTIC_CONNECTION,
  useFactory: () => {
    return new Client({
      host: process.env.ELASTIC_URL,
    });
  },
}
