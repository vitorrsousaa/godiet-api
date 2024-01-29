import { requestAdapter, responseAdapter } from '@/adapters';
import { makeControllerSignup } from '@/factories/controllers/makeControllerSignup';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const controller = makeControllerSignup();

  const response = await controller.handle(requestAdapter(event));

  return responseAdapter(response);
}
