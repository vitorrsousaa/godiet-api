import { ZodError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ISigninService } from '../../services';

import { SigninController } from './controller';

describe('Sign in controller', () => {
  let mockRequest: IRequest;
  let controller: SigninController;

  const spy = {
    'signInService.execute': {} as SpyInstance<
      ReturnType<ISigninService['execute']>
    >,
  };

  beforeEach(() => {
    const signInServiceInstance = {
      execute: fn(),
    } as unknown as ISigninService;

    mockRequest = {
      body: {},
    } as unknown as IRequest;

    spy['signInService.execute'] = spyOn(signInServiceInstance, 'execute');

    controller = new SigninController(signInServiceInstance);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  });

  it('Should return error when missing fields in authenticate', async () => {
    // Arrange
    const mockAuthenticate = {
      password: 'any_password',
    };

    mockRequest.body = { ...mockAuthenticate };

    // Act
    try {
      await controller.handle(mockRequest);
    } catch (error) {
      // Assert
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.field === 'email'));
      }
    }
  });

  it('Should return user when fields are correctly', async () => {
    // Arrange
    spy['signInService.execute'].mockResolvedValue({
      accessToken: 'any_token',
    });

    const mockAuthenticate = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    mockRequest.body = { ...mockAuthenticate };

    // Act
    const result = await controller.handle(mockRequest);

    // Assert
    expect(result.body).toEqual({
      accessToken: 'any_token',
    });
  });
});
