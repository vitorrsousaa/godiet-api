import { IRequest, IResponse } from './http';

export interface IData {
  data: Record<string, string>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
