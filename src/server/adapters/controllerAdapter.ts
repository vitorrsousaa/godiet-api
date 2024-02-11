import { IController } from '@/interfaces/controller';
import { IRequest } from '@/interfaces/http';
import { IData } from '@/interfaces/middlewares';

import { APIGatewayProxyEventV2 } from 'aws-lambda';

export function controllerAdapter(
  controller: IController,
  event: APIGatewayProxyEventV2,
  middleware?: IData
) {
  const request: IRequest = {
    body: JSON.parse(event.body || '{}'),
    accountId: middleware?.data?.accountId || undefined,
    patientId: event?.pathParameters?.patientId || undefined,
    params: event.pathParameters || {},
    headers: event.headers,
    queryParams: event.queryStringParameters || {},
  };

  const response = controller.handle(request);

  return response;
}
