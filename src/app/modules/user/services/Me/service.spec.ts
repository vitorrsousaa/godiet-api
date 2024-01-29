import { IUserRepositories } from '@/repositories/user';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IMeService, MeService } from './service';

describe('Recover user service', () => {
  let service: IMeService;

  let spy = {
    'userRepositories.findUnique': {} as SpyInstance<
      IUserRepositories['findUnique']
    >,
  };

  beforeEach(() => {
    const userRepositoriesInstance = {
      findUnique: fn(),
    } as unknown as IUserRepositories;

    spy = {
      'userRepositories.findUnique': spyOn(
        userRepositoriesInstance,
        'findUnique'
      ),
    };

    service = new MeService(userRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('should return user when id exists', async () => {
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
    const recover = await service.execute({
      userId: 'any_id',
    });

    // Assert
    expect(recover.name).toBe('any_name');
  });

  it('should throw error when user not exists', async () => {
    // Arrange
    spy['userRepositories.findUnique'].mockResolvedValue(null);

    // Act
    try {
      await service.execute({
        userId: 'any_id',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('User not exists');
    }
  });
});
