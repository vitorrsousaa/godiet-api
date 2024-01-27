import { controllerAdapter, responseAdapter } from '@/adapters';
import { makeControllerSignup } from '@/factories/controllers/makeControllerSignup';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const response = await controllerAdapter(makeControllerSignup(), event);

  return responseAdapter(response);
}
