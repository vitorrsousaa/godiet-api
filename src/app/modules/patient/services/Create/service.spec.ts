/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IPatientRepositories,
  PatientRepositories,
} from '@/repositories/patient';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { CreateService, ICreateService } from './service';

describe('Create Patient Service', () => {
  let service: ICreateService;

  let spy = {
    'patientRepositories.create': {} as SpyInstance<
      IPatientRepositories['create']
    >,
    'patientRepositories.findUnique': {} as SpyInstance<
      IPatientRepositories['findUnique']
    >,
  };

  beforeEach(() => {
    const patientRepositoriesInstance = {
      create: fn(),
      findUnique: fn(),
    } as unknown as PatientRepositories;

    spy = {
      'patientRepositories.create': spyOn(
        patientRepositoriesInstance,
        'create'
      ),
      'patientRepositories.findUnique': spyOn(
        patientRepositoriesInstance,
        'findUnique'
      ),
    };

    service = new CreateService(patientRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should throw error when email has already in use', async () => {
    // Arrange
    const date = new Date();

    spy['patientRepositories.findUnique'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      id: 'any_id',
      name: 'any_name',
      userId: 'any_user_id',
      height: null,
      weight: null,
    });

    const mockCreatePatient = {
      birthDate: new Date().toISOString(),
      email: 'any_email',
      name: 'any_name',
      phone: 'any_phone',
    };

    // Act
    try {
      await service.execute({
        patient: mockCreatePatient,
        userId: 'any_user_id',
      });
    } catch (error: any) {
      // Assert
      expect(error.message).toBe('Email already in use');
    }
  });

  it('Should return patient when email is not in use', async () => {
    // Arrange
    const date = new Date();
    spy['patientRepositories.findUnique'].mockResolvedValue(null);
    spy['patientRepositories.create'].mockResolvedValue({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
      id: 'any_id',
      userId: 'any_user_id',
    });

    const mockPatient = {
      birthDate: date.toISOString(),
      email: 'any_email',
      name: 'any_name',
      phone: 'any_phone',
    };

    // Act
    const output = await service.execute({
      patient: mockPatient,
      userId: 'any_user_id',
    });

    // Assert
    expect(output.patient).toEqual({
      birthDate: date,
      email: 'any_email',
      gender: 'MASC',
      height: 80,
      weight: 80,
      name: 'any_name',
      id: 'any_id',
      userId: 'any_user_id',
    });
  });
});
