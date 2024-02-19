import { IAnamnesisTemplateRepository } from '@/repositories/anamnesisTemplate';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { CreateService, ICreateService } from './service';

describe('Create anamnesis template service', () => {
  let service: ICreateService;

  let repository = {
    create: {} as SpyInstance<IAnamnesisTemplateRepository['create']>,
  };

  beforeEach(() => {
    const anamnesisTemplateRepositoriesInstance = {
      create: fn(),
    } as unknown as IAnamnesisTemplateRepository;

    repository = {
      create: spyOn(anamnesisTemplateRepositoriesInstance, 'create'),
    };

    service = new CreateService(anamnesisTemplateRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return anamnesis template created by user', async () => {
    // Arrange
    const date = new Date();
    repository.create.mockResolvedValue({
      id: 'any_id',
      userId: 'any_user_id',
      createdAt: date,
      updatedAt: date,
      text: 'any_text',
      title: 'any_title',
    });

    // Act

    const result = await service.execute({
      userId: 'any_user_id',
      text: 'any_text',
      title: 'any_title',
    });

    // Assert

    expect(result).toEqual({
      id: 'any_id',
      userId: 'any_user_id',
      createdAt: date,
      updatedAt: date,
      text: 'any_text',
      title: 'any_title',
    });
  });
});
