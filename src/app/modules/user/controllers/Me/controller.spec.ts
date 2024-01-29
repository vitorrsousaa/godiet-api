import { IRequest } from '@/interfaces/http';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import { IMeService } from '../../services/Me';

import { MeController } from './controller';

describe('MeController', () => {
  let mockRequest: IRequest;
  let controller: MeController;

  let spy = {
    'service.execute': {} as SpyInstance<IMeService['execute']>,
  };

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    } as IRequest;

    const recoverUserServiceInstance = {
      execute: fn(),
    } as unknown as IMeService;

    spy = {
      'service.execute': spyOn(recoverUserServiceInstance, 'execute'),
    };

    controller = new MeController(recoverUserServiceInstance);
  });

  afterEach(() => {
    clearAllMocks();
    mockRequest.body = {};
  });

  it('Should call response with returned of service', async () => {
    // Arrange
    mockRequest.accountId = '4b429c9e-7562-421a-9aa9-669e1b380b7a';
    spy['service.execute'].mockResolvedValue({
      email: 'any_email@email.com',
      id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
      name: 'any_name',
    });

    // Act

    const response = await controller.handle(mockRequest);

    // Assert

    expect(response).toEqual({
      statusCode: 200,
      body: {
        email: 'any_email@email.com',
        id: '4b429c9e-7562-421a-9aa9-669e1b380b7a',
        name: 'any_name',
      },
    });
  });
});
