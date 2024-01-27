import { IRequest } from '../../../../interfaces/controller';

import { SigninController } from './controller';

describe('SigninController', () => {
  let mockRequest: IRequest
  let controller: SigninController;

  let spy = {
    'service.execute': {} as jest.SpiedFunction<any>,
  }

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
    } as IRequest;

    spy = {
      'service.execute': jest.spyOn(service, 'execute'),
    }

    controller = new SigninController();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockRequest.body = {};
  })

  it('should be defined', async () => {
    // Arrange

    // Act

    // Assert
    expect(controller).toBeDefined();
  });

});
