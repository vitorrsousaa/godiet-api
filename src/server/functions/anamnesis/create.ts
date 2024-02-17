import {
  controllerAdapter,
  middlewareAdapter,
  responseAdapter,
} from '@/adapters';
import { makeControllerCreateAnamnesis } from '@/factories/controllers/anamnesis/makeControllerCreateAnamnesis';
import { makeMiddlewareAuthentication } from '@/factories/middlewares/makeMiddlewareAuthentication';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const responseMiddleware = await middlewareAdapter(
    makeMiddlewareAuthentication(),
    event
  );

  if ('statusCode' in responseMiddleware) {
    return responseAdapter(responseMiddleware);
  }

  const response = await controllerAdapter(
    makeControllerCreateAnamnesis(),
    event,
    responseMiddleware
  );

  return responseAdapter(response);
}
