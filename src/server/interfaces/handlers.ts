export interface IResponseLambda {
  statusCode: number;
  body: string;
  headers: Record<string, unknown>;
}
