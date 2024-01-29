import { ICrypt, IToken } from '@/interfaces/providers';
import { IUserRepositories } from '@/repositories/user';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ISignupService, SignupService } from './service';

describe('SignUp Service', () => {
  let service: ISignupService;
  let spy = {
    'userRepositories.create': {} as SpyInstance<IUserRepositories['create']>,
    'userRepositories.findUnique': {} as SpyInstance<
      IUserRepositories['findUnique']
    >,
    'cryptProvider.compare': {} as SpyInstance<ICrypt['compare']>,
    'tokenProvider.verify': {} as SpyInstance<IToken['verify']>,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      create: fn(),
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
      'userRepositories.create': spyOn(userRepositoriesInstance, 'create'),
      'userRepositories.findUnique': spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
      'cryptProvider.compare': spyOn(cryptProviderInstance, 'compare'),
      'tokenProvider.verify': spyOn(tokenProviderInstance, 'verify'),
    };

    service = new SignupService(
      userRepositoriesInstance,
      cryptProviderInstance,
      tokenProviderInstance
    );
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return user when email is not in use', async () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    spy['userRepositories.findUnique'].mockResolvedValue(null);
    spy['userRepositories.create'].mockResolvedValue({
      email: 'any_email',
      name: 'any_name',
      id: 'any_id',
      password: 'any_password',
      createdAt,
      updatedAt,
    });

    // Act
    const result = await service.execute({
      user: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
      },
    });

    // Assert
    expect(result.accessToken).toBe('generate_token');
  });

  it('Should throw error when email is in use', async () => {
    // Arrange
    const createdAt = new Date();
    const updatedAt = new Date();
    spy['userRepositories.findUnique'].mockResolvedValue({
      email: 'any_email',
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
      createdAt,
      updatedAt,
    });

    // Act
    try {
      await service.execute({
        user: {
          email: 'any_email',
          name: 'any_name',
          password: 'any_password',
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Invalid credentials');
    }
  });
});
