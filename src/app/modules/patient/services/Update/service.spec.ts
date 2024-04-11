import { AppError } from '@/errors';
import { IPatientRepositories } from '@/repositories/patient';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IUpdateService, UpdateService } from './service';

describe('Update patient service', () => {
  let service: IUpdateService;
  let spy = {
    'patientRepositories.update': {} as SpyInstance<
      IPatientRepositories['update']
    >,
    'patientRepositories.findFirst': {} as SpyInstance<
      IPatientRepositories['findFirst']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      update: fn(),
      findFirst: fn(),
    } as unknown as IPatientRepositories;

    spy = {
      'patientRepositories.update': spyOn(
        patientRepositoriesInstance,
        'update'
      ),

      'patientRepositories.findFirst': spyOn(
        patientRepositoriesInstance,
        'findFirst'
      ),
    };

    service = new UpdateService(patientRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return patient when user is owner', async () => {
    // Arrange
    const date = new Date();
    spy['patientRepositories.update'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
    });
    spy['patientRepositories.findFirst'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      id: 'any_patient_id',
      name: 'any_name',
      userId: 'any_user_id',
    });

    const mockUpdatePatient = {
      name: 'any_name',
      email: 'any_email@email.com',
      height: 200,
    };

    // Act
    const output = await service.execute({
      patient: mockUpdatePatient,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    expect(output).toStrictEqual({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
    });
  });

  it('Should throw error when email has already with other patient', async () => {
    // Arrange
    spy['patientRepositories.findFirst'].mockResolvedValue({
      birthDate: new Date(),
      email: 'any_email',
      gender: 'MASC',
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
    });

    const mockUpdatePatient = {
      name: 'any_name',
      email: 'any_email@email.com',
    };

    // Act
    const promise = service.execute({
      patient: mockUpdatePatient,
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Assert
    promise.catch((error) => {
      expect(error).toBeInstanceOf(AppError);
      expect(error.message).toBe('Patient Already Exists');
    });
  });
});
