import { IRequest } from '@/interfaces/http';

import { APIGatewayProxyEventV2 } from 'aws-lambda';

export function requestAdapter(event: APIGatewayProxyEventV2): IRequest {
  const request = {
    body: JSON.parse(event.body || '{}'),
    accountId: undefined,
    patientId: event.pathParameters?.patientId || undefined,
    params: event.pathParameters || {},
    headers: event.headers,
    queryParams: event.queryStringParameters || {},
  };

  return request;
}
