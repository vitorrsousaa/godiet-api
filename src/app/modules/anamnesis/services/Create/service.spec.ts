import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { CreateService, ICreateService } from './service';

describe('Create anamnesis service', () => {
  let service: ICreateService;

  let spy = {
    'anamnesisRepositories.create': {} as SpyInstance<
      IAnamnesisRepository['create']
    >,
  };

  beforeEach(() => {
    const anamnesisRepositoriesInstance = {
      create: fn(),
    } as unknown as IAnamnesisRepository;

    spy = {
      'anamnesisRepositories.create': spyOn(
        anamnesisRepositoriesInstance,
        'create'
      ),
    };

    service = new CreateService(anamnesisRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('Should return anamnesis when user is owner', async () => {
    // Arrange
    const date = new Date();
    spy['anamnesisRepositories.create'].mockResolvedValue({
      id: 'any_id',
      createdAt: date,
      updatedAt: date,
      title: 'any_title',
      text: 'any_text',
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });

    // Act
    const result = await service.execute({
      userId: 'any_user_id',
      patientId: 'any_patient_id',
      title: 'any_title',
      text: 'any_text',
    });

    // Assert
    expect(result).toEqual({
      id: 'any_id',
      createdAt: date,
      updatedAt: date,
      title: 'any_title',
      text: 'any_text',
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    });
  });
});
