import { AppError } from '@/errors';
import { IPatientRepositories } from '@/repositories/patient';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { DeleteService, IDeleteService } from './service';

describe('Delete patient service', () => {
  let service: IDeleteService;
  let spy = {
    'patientRepositories.delete': {} as SpyInstance<
      IPatientRepositories['delete']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      delete: fn(),
    } as unknown as IPatientRepositories;

    spy = {
      'patientRepositories.delete': spyOn(
        patientRepositoriesInstance,
        'delete'
      ),
    };

    service = new DeleteService(patientRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return patient when user is owner', async () => {
    // Arrange
    spy['patientRepositories.delete'].mockResolvedValue({
      birthDate: new Date(),
      email: 'any_email',
      gender: 'MASC',
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
    });

    // Act
    const patient = await service.execute({
      patientId: 'any_id',
      userId: 'any_user_id',
    });

    // Assert
    expect(patient).toBeNull();
  });

  it('Should throw error when patient doenst exists', async () => {
    // Arrange
    spy['patientRepositories.delete'].mockRejectedValue('incorrect');

    // Act
    const promise = service.execute({
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    promise.catch((error) => {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Patient not Found');
    });
  });
});
