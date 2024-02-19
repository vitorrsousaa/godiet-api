import { IAnamnesisTemplateRepository } from '@/repositories/anamnesisTemplate';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { FindAllService, IFindAllService } from './service';

describe('Find all anamnesis template by user service', () => {
  let service: IFindAllService;

  let repository = {
    findMany: {} as SpyInstance<IAnamnesisTemplateRepository['findMany']>,
  };

  beforeEach(() => {
    const anamnesisTemplateRepositoriesInstance = {
      findMany: fn(),
    } as unknown as IAnamnesisTemplateRepository;

    repository = {
      findMany: spyOn(anamnesisTemplateRepositoriesInstance, 'findMany'),
    };

    service = new FindAllService(anamnesisTemplateRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return all anamnesis template by user', async () => {
    // Arrange

    const date = new Date();

    repository.findMany.mockResolvedValue([
      {
        id: 'any_id',

        userId: 'any_user_id',

        createdAt: date,

        updatedAt: date,

        text: 'any_text',

        title: 'any_title',
      },
    ]);

    // Act

    const result = await service.execute({ userId: 'any_user_id' });

    // Assert

    expect(result).toEqual([
      {
        id: 'any_id',

        userId: 'any_user_id',

        createdAt: date,

        updatedAt: date,

        text: 'any_text',

        title: 'any_title',
      },
    ]);
  });
});
