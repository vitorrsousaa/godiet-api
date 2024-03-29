import { AppError } from '@/errors';
import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IFindAllService } from '../../services/FindAll';

import { FindAllController } from './controller';

describe('FindAllController', () => {
  let mockRequest: IRequest;
  let controller: FindAllController;

  let spy = {
    'service.execute': {} as SpyInstance<IFindAllService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      accountId: '',
    } as IRequest;

    const service = {
      execute: fn(),
    } as unknown as IFindAllService;

    spy = {
      'service.execute': spyOn(service, 'execute'),
    };

    controller = new FindAllController(service);
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
  it('Should return correct status code and return of service', async () => {
    // Arrange
    const date = new Date();
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockResolvedValue([
      {
        createdAt: date,
        updatedAt: date,
        id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
        text: 'text',
        title: 'title',
        userId: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
      },
    ]);
    // Includes all fields that are required

    // Act
    const response = await controller.handle(mockRequest);

    // Assert
    expect(response).toEqual({
      statusCode: 200,
      body: [
        {
          createdAt: date,
          updatedAt: date,
          id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
          text: 'text',
          title: 'title',
          userId: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
        },
      ],
    });
  });
});