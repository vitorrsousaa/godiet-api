/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICrypt, IToken } from '@/interfaces/providers';
import { IUserRepositories } from '@/repositories/user';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ISigninService, SigninService } from './service';

describe('SignIn service', () => {
  let service: ISigninService;
  let spy = {
    'userRepositories.findUnique': {} as SpyInstance<
      IUserRepositories['findUnique']
    >,
    'cryptProvider.compare': {} as SpyInstance<ICrypt['compare']>,
    'tokenProvider.verify': {} as SpyInstance<IToken['verify']>,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      findUnique: fn(),
    } as unknown as IUserRepositories;

    const cryptProviderInstance = {
      hash: fn().mockResolvedValue('hashed_password'),
      compare: fn(),
    } as unknown as ICrypt;

    const tokenProviderInstance = {
      generate: fn().mockReturnValue('generate_token'),
      verify: fn(),
    } as unknown as IToken;

    spy = {
      'userRepositories.findUnique': spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
      'cryptProvider.compare': spyOn(cryptProviderInstance, 'compare'),
      'tokenProvider.verify': spyOn(tokenProviderInstance, 'verify'),
    };

    service = new SigninService(
      userRepositoriesInstance,
      cryptProviderInstance,
      tokenProviderInstance
    );
  });

  afterEach(() => {
    clearAllMocks();
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
      updatedAt,
    });
    spy['cryptProvider.compare'].mockResolvedValue(true);

    // Act
    const signIn = await service.execute({
      user: { email: 'any_email', password: 'any_password' },
    });

    // Assert
    expect(signIn.accessToken).toBe('generate_token');
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
      expect(error.message).toBe('Invalid credentials');
    }
  });
});
