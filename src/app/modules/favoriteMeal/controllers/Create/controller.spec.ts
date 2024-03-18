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

  const mockFavoriteMealToCreate = {
    name: 'favoriteMeal',
    mealFoods: [
      {
        qty: 10,
        measure: { qty: 5, name: 'Colher' },
        options: [],
        foodId: 'cc4c275f-923b-4b6c-b3e1-952b30f88f42',
      },
    ],
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
    mockRequest.body = mockFavoriteMealToCreate;

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
    mockRequest.body = mockFavoriteMealToCreate;

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
    mockRequest.body = mockFavoriteMealToCreate;

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

  it('Should call service with correct parameters', async () => {
    // Arrange

    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    // Includes all fields that are required
    mockRequest.body = mockFavoriteMealToCreate;

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toBeCalledWith({
      userId: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
      favoriteMeal: {
        ...mockFavoriteMealToCreate,
      },
    });
  });
});
