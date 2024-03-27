import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { DeleteService, IDeleteService } from './service';

describe('Delete anamnesis service', () => {
  let service: IDeleteService;

  let spy = {
    'anamnesisRepositories.delete': {} as SpyInstance<
      IAnamnesisRepository['delete']
    >,
  };

  beforeEach(() => {
    const anamnesisRepositoriesInstance = {
      delete: fn(),
    } as unknown as IAnamnesisRepository;

    spy = {
      'anamnesisRepositories.delete': spyOn(
        anamnesisRepositoriesInstance,
        'delete'
      ),
    };

    service = new DeleteService(anamnesisRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('should delete anamnesis correctly and return null', async () => {
    // Arrange
    const deleteInput = {
      userId: 'any_user_id',
      patientId: 'any_patient_id',
      anamnesisId: 'any_anamnesis_id',
    };

    // Execute delete service
    // Act
    const result = await service.execute(deleteInput);

    // Assert
    // Verify repository delete method was called correctly
    expect(spy['anamnesisRepositories.delete']).toHaveBeenCalledWith({
      where: {
        id: deleteInput.anamnesisId,
        patientId: deleteInput.patientId,
        userId: deleteInput.userId,
      },
    });

    expect(result).toBeNull();
  });

  it('should throw InvalidAnamnesis exception if an error occurs while deleting anamnesis', async () => {
    // Arrange
    const deleteInput = {
      userId: 'any_user_id',
      patientId: 'any_patient_id',
      anamnesisId: 'any_anamnesis_id',
    };
    spy['anamnesisRepositories.delete'].mockRejectedValue(new Error('Invalid'));

    // Execute delete service and check if it throws expected exception
    await expect(service.execute(deleteInput)).rejects.toThrow();
  });
});
