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
      accountId: 'any_user_id',
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

  it('Should call service with user id', async () => {
    // Arrange

    // Act
    await controller.handle(mockRequest);

    // Assert
    expect(spy['service.execute']).toHaveBeenCalledWith({
      userId: 'any_user_id',
    });
  });

  it('should call response with data returned of service', async () => {
    // arrange
    const date = new Date();
    spy['service.execute'].mockResolvedValue([
      {
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        id: 'any_id',
        userId: 'any_user_id',
      },
    ]);

    // act
    const result = await controller.handle(mockRequest);

    // assert
    expect(result.body).toEqual([
      {
        birthDate: date,
        email: 'any_email',
        name: 'any_name',
        gender: 'MASC',
        id: 'any_id',
        userId: 'any_user_id',
      },
    ]);
  });
});
