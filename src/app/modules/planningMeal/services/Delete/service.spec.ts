import { IPlanningMealRepositories } from '@/repositories/planningMeal';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { DeleteService, IDeleteService } from './service';

describe('Delete planning meal service', () => {
  let service: IDeleteService;

  let spy = {
    'planningMealRepositories.delete': {} as SpyInstance<
      IPlanningMealRepositories['delete']
    >,
  };

  beforeEach(() => {
    const planningMealRepositoriesInstance = {
      delete: fn(),
    } as unknown as IPlanningMealRepositories;

    spy = {
      'planningMealRepositories.delete': spyOn(
        planningMealRepositoriesInstance,
        'delete'
      ),
    };

    service = new DeleteService(planningMealRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should throw error user not owner patient', async () => {
    // Arrange
    spy['planningMealRepositories.delete'].mockRejectedValue('incorrect');

    // Act
    const promise = service.execute({
      patientId: 'patientId',
      planningMealId: 'planningMealId',
      userId: 'userId',
    });

    // Assert
    await expect(promise).rejects.toThrow(new Error('Planning not found'));
  });
});
