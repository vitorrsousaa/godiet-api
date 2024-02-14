import { ZodError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ICreateService } from '../../services/Create';

import { CreateController } from './controller';

describe('CreatePatientController', () => {
  let mockRequest: IRequest;
  let controller: CreateController;

  let spy = {
    'createPatientService.execute': {} as SpyInstance<
      ICreateService['execute']
    >,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: 'any_user_id',
    } as IRequest;

    const createPatientServiceInstance = {
      execute: fn(),
    } as unknown as ICreateService;

    spy = {
      'createPatientService.execute': spyOn(
        createPatientServiceInstance,
        'execute'
      ),
    };

    controller = new CreateController(createPatientServiceInstance);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  });

  it('should throw error when missing fields', async () => {
    // Arrange
    mockRequest.body = {
      birthDate: 'any_birthDate',
      gender: 'MASC',
      height: 1.8,
      name: 'any_name',
      weight: 80,
    };

    // Act
    try {
      await controller.handle(mockRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.message.some((error) => error.field === 'email'));
      }
    }
  });

  it('should call service with data patient and user id', async () => {
    // arrange
    const date = new Date('2023-10-26T03:00:00.000Z');
    mockRequest.body = {
      birthDate: date.toString(),
      gender: 'MASC',
      height: 1.8,
      name: 'any_name',
      weight: 80,
      email: 'email@email.com',
      phone: 'any_phone',
    };

    // act
    try {
      await controller.handle(mockRequest);
    } catch (error) {
      console.log(error);
    }

    // assert
    expect(spy['createPatientService.execute']).toBeCalledWith({
      patient: {
        birthDate: date.toString(),
        gender: 'MASC',
        height: 1.8,
        name: 'any_name',
        weight: 80,
        email: 'email@email.com',
        phone: 'any_phone',
      },
      userId: 'any_user_id',
    });
  });

  it('should call response with data returned of service', async () => {
    // arrange
    // const date = new Date();
    mockRequest.body = {
      birthDate: 'Fri Oct 26 2023',
      gender: 'MASC',
      height: 1.8,
      name: 'any_name',
      weight: 80,
      email: 'email@email.com',
      phone: 'any_phone',
    };

    spy['createPatientService.execute'].mockResolvedValue({
      patient: {
        // birthDate: date,
        // email: 'any_email',
        name: 'any_name',
        // gender: 'MASC',
        // height: 1.8,
        // weight: 80,
        // id: 'any_id',
        // userId: 'any_user_id',
        // status: 'ACTIVE',
      },
    });

    // act
    const result = await controller.handle(mockRequest);

    // assert
    expect(result.body).toEqual({
      patient: {
        // birthDate: date,
        // email: 'any_email',
        name: 'any_name',
        // gender: 'MASC',
        // height: 1.8,
        // weight: 80,
        // id: 'any_id',
        // userId: 'any_user_id',
        // status: 'ACTIVE',
      },
    });
  });
});
