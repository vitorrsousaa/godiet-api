import { requestAdapter, responseAdapter } from '@/adapters';
import { makeControllerCreatePatient } from '@/factories/controllers/patient/makeControllerCreatePatient';
import { makeMiddlewareAuthentication } from '@/factories/middlewares/makeMiddlewareAuthentication';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = requestAdapter(event);

  const middleware = makeMiddlewareAuthentication();

  const responseMiddleware = await middleware.handle(request);

  if ('statusCode' in responseMiddleware) {
    return {
      statusCode: responseMiddleware.statusCode,
      body: JSON.stringify(responseMiddleware.body),
    };
  }

  const controller = makeControllerCreatePatient();

  const response = await controller.handle(request);

  return responseAdapter(response);
}
