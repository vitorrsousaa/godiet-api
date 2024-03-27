import { IAnamnesisRepository } from '@/repositories/anamnesis/repository';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { Anamnesis } from '@prisma/client';

import { FindAllService, IFindAllService } from './service';

describe('FindAll anamnesis service', () => {
  let service: IFindAllService;

  let spy = {
    'anamnesisRepositories.findAll': {} as SpyInstance<
      IAnamnesisRepository['findAll']
    >,
  };

  beforeEach(() => {
    const anamnesisRepositoriesInstance = {
      findAll: fn(),
    } as unknown as IAnamnesisRepository;

    spy = {
      'anamnesisRepositories.findAll': spyOn(
        anamnesisRepositoriesInstance,
        'findAll'
      ),
    };

    service = new FindAllService(anamnesisRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('should return anamnesis array', async () => {
    // Arrange
    const date = new Date();
    const exampleAnamnesis: Anamnesis = {
      createdAt: date,
      updatedAt: date,
      id: 'any_id',
      patientId: 'any_patient_id',
      text: 'any_text',
      title: 'any_title',
      userId: 'any_user_id',
    };
    spy['anamnesisRepositories.findAll'].mockResolvedValue([exampleAnamnesis]);
    const findAllInput = {
      userId: 'any_user_id',
      patientId: 'any_patient_id',
    };

    // Execução do serviço de busca
    const result = await service.execute(findAllInput);

    // Verificação de que o método findAll do repositório foi chamado corretamente
    expect(spy['anamnesisRepositories.findAll']).toHaveBeenCalledWith({
      where: {
        userId: findAllInput.userId,
        patientId: findAllInput.patientId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Verificação de que o serviço retornou os dados esperados
    expect(result).toEqual([exampleAnamnesis]);
  });
});
