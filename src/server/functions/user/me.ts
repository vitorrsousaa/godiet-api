import {
  controllerAdapter,
  middlewareAdapter,
  responseAdapter,
} from '@/adapters';
import { makeControllerMe } from '@/factories/controllers/user/makeControllerMe';
import { makeMiddlewareAuthentication } from '@/factories/middlewares/makeMiddlewareAuthentication';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const responseMiddleware = await middlewareAdapter(
    makeMiddlewareAuthentication(),
    event
  );

  if ('statusCode' in responseMiddleware) {
    return {
      statusCode: responseMiddleware.statusCode,
      body: JSON.stringify(responseMiddleware.body),
    };
  }

  const response = await controllerAdapter(
    makeControllerMe(),
    event,
    responseMiddleware
  );

  return responseAdapter(response);
}
