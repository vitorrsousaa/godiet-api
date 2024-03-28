import {
  controllerAdapter,
  middlewareAdapter,
  responseAdapter,
} from '@/adapters';
import { makeControllerCreateObservationTemplate } from '@/factories/controllers/observationTemplate/makeControllerCreateObservationTemplate';
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
    makeControllerCreateObservationTemplate(),

    event,

    responseMiddleware
  );

  return responseAdapter(response);
}
