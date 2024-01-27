import { IController } from '@/interfaces/controller';

import { APIGatewayProxyEventV2 } from 'aws-lambda';

export function controllerAdapter(
  controller: IController,
  event: APIGatewayProxyEventV2
) {
  const request = {
    body: JSON.parse(event.body || '{}'),
    // accountId: event.requestContext.authorizer?.accountId,
    accountId: undefined,
    patientId: undefined,
    // patientId: event.requestContext.authorizer?.patientId,
    params: event.pathParameters || {},
  };

  const response = controller.handle(request);

  return response;
}
