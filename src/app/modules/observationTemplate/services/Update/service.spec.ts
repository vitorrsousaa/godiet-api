import { IObservationTemplateRepository } from '@/repositories/observationTemplate';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IUpdateService, UpdateService } from './service';

describe('Update observation template service', () => {
  let service: IUpdateService;

  let repository = {
    update: {} as SpyInstance<IObservationTemplateRepository['update']>,
  };

  beforeEach(() => {
    const observationTemplateRepositoriesInstance = {
      update: fn(),
    } as unknown as IObservationTemplateRepository;

    repository = {
      update: spyOn(observationTemplateRepositoriesInstance, 'update'),
    };

    service = new UpdateService(observationTemplateRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should throw error when observation template not exists', async () => {
    // Arrange
    repository.update.mockRejectedValue(new Error('Error'));
    const updateInput = {
      userId: 'any_user_id',
      observation: {
        id: 'any_id',
        text: 'any_text',
        title: 'any_title',
      },
    };

    // Act

    // Assert
    await expect(service.execute(updateInput)).rejects.toThrow();
  });

  it('Should return correct observation template updated', async () => {
    // Arrange
    const date = new Date();
    repository.update.mockResolvedValue({
      createdAt: date,
      updatedAt: date,
      id: 'any_id',
      text: 'any_text',
      title: 'any_title',
      userId: 'any_user_id',
    });

    // Act
    const result = await service.execute({
      userId: 'any_user_id',
      observation: {
        id: 'any_id',
        text: 'any_text',
        title: 'any_title',
      },
    });

    // Assert
    expect(result).toEqual({
      createdAt: date,
      updatedAt: date,
      id: 'any_id',
      text: 'any_text',
      title: 'any_title',
      userId: 'any_user_id',
    });
  });
});
