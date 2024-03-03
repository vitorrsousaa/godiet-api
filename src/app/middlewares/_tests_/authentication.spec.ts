import { IRequest } from '@/interfaces/http';
import { IMiddleware } from '@/interfaces/middlewares';
import { IToken } from '@/interfaces/providers';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { AuthenticationMiddleware } from '../authentication';

describe('Authentication middleware', () => {
  let middleware: IMiddleware;
  let spy = {
    'token.verify': {} as SpyInstance<IToken['verify']>,
  };
  let mockRequest: IRequest;
  beforeEach(() => {
    const tokenProvider = {
      verify: fn(),
    } as unknown as IToken;
    spy = {
      'token.verify': spyOn(tokenProvider, 'verify'),
    };

    middleware = new AuthenticationMiddleware(tokenProvider);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest = {
      body: {},
      headers: {},
      params: {},
      queryParams: {},
    };
  });

  it('Should return error when not exists header authorization', async () => {
    // Arrange
    mockRequest = {
      body: {},
      headers: {},
      params: {},
      queryParams: {},
    };

    // Act
    const result = await middleware.handle(mockRequest);

    // Assert
    expect(result).toEqual({
      statusCode: 401,
      body: {
        error: 'Invalid access token',
      },
    });
  });

  it('Should return error when not exists bearer token', async () => {
    // Arrange
    mockRequest = {
      body: {},
      headers: {
        authorization: '123',
      },
      params: {},
      queryParams: {},
    };

    // Act
    const result = await middleware.handle(mockRequest);

    // Assert
    expect(result).toEqual({
      statusCode: 401,
      body: {
        error: 'Invalid access token',
      },
    });
  });

  it('Should return error when token is invalid', async () => {
    // Arrange
    mockRequest = {
      body: {},
      headers: {
        authorization: 'Bearer 123456',
      },
      params: {},
      queryParams: {},
    };
    spy['token.verify'].mockRejectedValue('Incorrect Error');

    // Act
    const result = await middleware.handle(mockRequest);

    // Assert
    expect(result).toEqual({
      statusCode: 401,
      body: {
        error: 'Invalid access token',
      },
    });
  });

  it('Should return data when access token is valid', async () => {
    // Arrange
    mockRequest = {
      body: {},
      headers: {
        authorization: 'Bearer 123456',
      },
      params: {},
      queryParams: {},
    };
    spy['token.verify'].mockResolvedValue({
      id: 'id_user',
    });

    // Act
    const result = await middleware.handle(mockRequest);

    // Assert
    expect(result).toEqual({
      data: {
        accountId: 'id_user',
      },
    });
  });
});
