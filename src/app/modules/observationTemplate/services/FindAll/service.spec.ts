import { IObservationTemplateRepository } from '@/repositories/observationTemplate';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { FindAllService, IFindAllService } from './service';

describe('Find all observation template', () => {
  let service: IFindAllService;

  let repository = {
    findMany: {} as SpyInstance<IObservationTemplateRepository['findMany']>,
  };

  beforeEach(() => {
    const observationTemplateRepositoriesInstance = {
      findMany: fn(),
    } as unknown as IObservationTemplateRepository;

    repository = {
      findMany: spyOn(observationTemplateRepositoriesInstance, 'findMany'),
    };

    service = new FindAllService(observationTemplateRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return all observation templates by user', async () => {
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

    // Arrange
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
