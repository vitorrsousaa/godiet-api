import { AppError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { ICreateService } from '../../services/Create';

import { CreateController } from './controller';

describe('CreateController', () => {
  let mockRequest: IRequest;
  let controller: CreateController;

  let spy = {
    'service.execute': {} as SpyInstance<ICreateService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: '',
    } as IRequest;

    const service = {
      execute: fn(),
    } as unknown as ICreateService;

    spy = {
      'service.execute': spyOn(service, 'execute'),
    };

    controller = new CreateController(service);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  });

  it('Should throw error  when account id is not provided', async () => {
    // Arrange

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'User not found',
      },
    });
  });

  it('Should throw error when is called with incorrect schema ', async () => {
    // Arrange
    mockRequest.accountId = 'account_id';
    mockRequest.patientId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    // Includes all fields that are required
    mockRequest.body = {
      title: 'any_title',
      text: 'any_text',
    };

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 422,
      body: [
        {
          field: 'userId',
          message: 'Invalid uuid',
        },
      ],
    });
  });

  it('Should throw error when service throw unknown error', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.patientId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockRejectedValue('Incorrect Error');
    // Includes all fields that are required
    mockRequest.body = {
      title: 'any_title',
      text: 'any_text',
    };

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 500,
      body: {
        error: 'Internal server error',
      },
    });
  });

  it('Should throw error when service throw app error', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.patientId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockRejectedValue(
      new AppError('Incorrect Error', 400)
    );
    // Includes all fields that are required
    mockRequest.body = {
      title: 'any_title',
      text: 'any_text',
    };
    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'Incorrect Error',
      },
    });
  });

  it('Should call response with returned of service', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.patientId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    mockRequest.body = {
      title: 'any_title',
      text: 'any_text',
    };
    const date = new Date();
    spy['service.execute'].mockResolvedValue({
      id: 'cfa64408-ba83-4311-be71-e865f7d63535',
      userId: '529e7968-7300-4b63-a582-eda5eb4c7508',
      patientId: '30c26fe6-d70e-420e-83b3-ac45374a0364',
      createdAt: date,
      updatedAt: date,
      text: 'joaquim',
      title: 'title',
    });

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 201,
      body: {
        id: 'cfa64408-ba83-4311-be71-e865f7d63535',
        userId: '529e7968-7300-4b63-a582-eda5eb4c7508',
        patientId: '30c26fe6-d70e-420e-83b3-ac45374a0364',
        createdAt: date,
        updatedAt: date,
        text: 'joaquim',
        title: 'title',
      },
    });
  });
});
