import { AppError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IDeleteService } from '../../services/Delete';

import { DeleteController } from './controller';

describe('DeleteController', () => {
  let mockRequest: IRequest;
  let controller: DeleteController;

  let spy = {
    'service.execute': {} as SpyInstance<IDeleteService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: '',
      queryParams: {},
    } as IRequest;

    const service = {
      execute: fn(),
    } as unknown as IDeleteService;

    spy = {
      'service.execute': spyOn(service, 'execute'),
    };

    controller = new DeleteController(service);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  });

  it('Should throw error when account id is not provided', async () => {
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
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';
    mockRequest.queryParams.planningMealId =
      'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

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
    spy['service.execute'].mockRejectedValue('Incorrect Error');
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';
    mockRequest.queryParams.planningMealId =
      'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

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
    spy['service.execute'].mockRejectedValue(
      new AppError('Incorrect Error', 400)
    );
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';
    mockRequest.queryParams.planningMealId =
      'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

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

  it('Should return correctly', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockResolvedValue(null);
    // Includes all fields that are required
    mockRequest.patientId = 'cc4c275f-923b-4b6c-b3e1-952b30f88f42';
    mockRequest.queryParams.planningMealId =
      'cc4c275f-923b-4b6c-b3e1-952b30f88f42';

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 201,
      body: null,
    });
  });
});
