import { ZodError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ISignupService } from '../../services/Signup';

import { SignupController } from './controller';

describe('Sign up controller', () => {
  let mockRequest: IRequest;

  let controller: SignupController;

  let spy = {
    'signUpService.execute': {} as SpyInstance<ISignupService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
    } as unknown as IRequest;

    const signUpServiceInstance = {
      execute: fn(),
    } as unknown as ISignupService;

    spy = {
      'signUpService.execute': spyOn(signUpServiceInstance, 'execute'),
    };

    controller = new SignupController(signUpServiceInstance);
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
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.field === 'email'));
      }
    }
  });

  it('Should return user when fields are correctly', async () => {
    // Arrange
    spy['signUpService.execute'].mockResolvedValue({
      accessToken: 'any_token',
    });

    const mockAuthenticate = {
      email: 'any_email@email.com',
      password: 'any_password',
      name: 'any_name',
      phone: 'any_phone',
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
