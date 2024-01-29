import { requestAdapter, responseAdapter } from '@/adapters';
import { makeControllerSignin } from '@/factories/controllers/makeControllerSignin';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const controller = makeControllerSignin();

  const response = await controller.handle(requestAdapter(event));
  return responseAdapter(response);
}
