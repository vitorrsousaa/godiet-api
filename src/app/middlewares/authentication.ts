import { IRequest, IResponse } from '@/interfaces/http';
import { IData, IMiddleware } from '@/interfaces/middlewares';
import { IToken } from '@/interfaces/providers';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(private readonly tokenProvider: IToken) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const { authorization } = request.headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        throw new Error();
      }

      const payload = this.tokenProvider.verify(token);

      return {
        data: {
          accountId: payload.id,
        },
      };
    } catch (error) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}
