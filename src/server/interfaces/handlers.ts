import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface IResponseLambda {
  statusCode: number;
  body: string;
  headers: Record<string, unknown>;
}

export type IHandlerLambda = (
  event: APIGatewayProxyEventV2
) => Promise<IResponseLambda>;
