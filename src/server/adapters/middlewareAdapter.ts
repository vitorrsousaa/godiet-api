import { IMiddleware } from '@/interfaces/middlewares';

import { APIGatewayProxyEventV2 } from 'aws-lambda';

import { requestAdapter } from './requestAdapter';

export function middlewareAdapter(
  middleware: IMiddleware,
  event: APIGatewayProxyEventV2
) {
  const request = requestAdapter(event);

  return middleware.handle(request);
}
