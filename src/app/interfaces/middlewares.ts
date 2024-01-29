import { IRequest, IResponse } from './http';

export interface IData {
  data: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
