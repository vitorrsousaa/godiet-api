/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';

import UserRepositories from '../../../../shared/database/repositories/user/UserRepositories';
import { ICrypt } from '../../../../shared/interfaces/crypt';
import { IToken } from '../../../../shared/interfaces/token';
import verifyObject from '../../../../shared/utils-test/verifyObject';

import SignIn, { ISignInService } from './SignInService';

const signInServiceSchema = z.object({
  name: z.string(),
  email: z.string(),
  id: z.string(),
  token: z.string(),
});

describe('SignIn service', () => {
  let service: ISignInService;
  let spy = {
    'userRepositories.findUnique': {} as jest.SpiedFunction<
      UserRepositories['findUnique']
    >,
    'cryptProvider.compare': {} as jest.SpiedFunction<ICrypt['compare']>,
    'tokenProvider.verify': {} as jest.SpiedFunction<IToken['verify']>,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      findUnique: jest.fn(),
    } as unknown as UserRepositories;

    const cryptProviderInstance = {
      hash: jest.fn().mockResolvedValue('hashed_password'),
      compare: jest.fn(),
    } as unknown as ICrypt;

    const tokenProviderInstance = {
      generate: jest.fn().mockReturnValue('generate_token'),
      verify: jest.fn(),
    } as unknown as IToken;

    spy = {
      'userRepositories.findUnique': jest.spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
      'cryptProvider.compare': jest.spyOn(cryptProviderInstance, 'compare'),
      'tokenProvider.verify': jest.spyOn(tokenProviderInstance, 'verify'),
    };

    service = new SignIn(
      userRepositoriesInstance,
      cryptProviderInstance,
      tokenProviderInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return user when email and password is correctly', async () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    spy['userRepositories.findUnique'].mockResolvedValue({
      name: 'any_name',
      email: 'any_email',
      id: 'any_id',
      password: 'any_password',
      createdAt,
      hash: null,
      updatedAt,
    });

    spy['cryptProvider.compare'].mockResolvedValue(true);

    // Act
    const signIn = await service.execute({
      user: { email: 'any_email', password: 'any_password' },
    });

    const result = verifyObject(signInServiceSchema, signIn);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should throw error when password is incorrectly', async () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    spy['userRepositories.findUnique'].mockResolvedValue({
      id: 'any_id',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      createdAt,
      hash: null,
      updatedAt,
    });

    spy['cryptProvider.compare'].mockResolvedValue(false);

    // Act
    try {
      await service.execute({
        user: { email: 'any_email', password: 'any_password' },
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });

  it('Should throw error when user not exists', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue(null);

    // Act
    try {
      await service.execute({
        user: { email: 'any_email', password: 'any_password' },
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });
});
