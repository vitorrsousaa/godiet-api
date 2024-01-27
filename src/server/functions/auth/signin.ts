import { controllerAdapter, responseAdapter } from '@/adapters';
import { makeControllerSignin } from '@/factories/controllers/makeControllerSignin';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const response = await controllerAdapter(makeControllerSignin(), event);

  return responseAdapter(response);
}
