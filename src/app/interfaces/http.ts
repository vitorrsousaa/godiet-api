export interface IRequest {
  body: Record<string, unknown>;
  accountId?: string | undefined;
  patientId?: string | undefined;
  params: Record<string, unknown>;
  headers: Record<string, string | undefined>;
  queryParams: Record<string, string | undefined>;
}

export interface IResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | null;
}
