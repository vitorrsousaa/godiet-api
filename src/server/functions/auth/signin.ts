import { requestAdapter, responseAdapter } from '@/adapters';
import { makeControllerSignin } from '@/factories/controllers/makeControllerSignin';

import middy from '@middy/core';
import cors from '@middy/http-cors';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

async function lambdaHandler(event: APIGatewayProxyEventV2) {
  const controller = makeControllerSignin();

  const response = await controller.handle(requestAdapter(event));

  return responseAdapter(response);
}

export const handler = middy().use(cors()).handler(lambdaHandler);
