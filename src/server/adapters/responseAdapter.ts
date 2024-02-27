import { IResponse } from '@/interfaces/http';

import { IResponseLambda } from '../interfaces/handlers';

export function responseAdapter(response: IResponse): IResponseLambda {
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body),
    headers: {
      'Access-Control-Allow-Origin': 'https://godiet.com.br',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'POST,PATCH,PUT,DELETE,GET,OPTIONS,HEAD',
    },
  };
}
