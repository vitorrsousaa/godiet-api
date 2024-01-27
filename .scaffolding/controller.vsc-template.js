(function Template() {
  const toPascalCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (fl) => fl.toUpperCase())
      .replace(/\W+/g, '');

  const toCamelCase = (str) =>
    toPascalCase(str).replace(/^./, (firstLetter) => firstLetter.toLowerCase());

  return {
    userInputs: [
      {
        title: 'Controller Name',
        argumentName: 'name',
        defaultValue: 'Sample',
      },
    ],
    template: [
      {
        type: 'folder',
        name: (inputs) => `${toPascalCase(inputs.name)}`,
        children: [
          {
            type: 'file',
            name: 'index.ts',
            content: (inputs) => `import { ${toPascalCase(
              inputs.name
            )}Controller } from './controller';

export default ${toPascalCase(inputs.name)}Controller;
`,
          },
          {
            type: 'file',
            name: 'controller.ts',
            content: (inputs) => `import {
  IController,
  IRequest,
  IResponse,
} from '../../../../interfaces/controller';

export class ${toPascalCase(inputs.name)}Controller implements IController {
  constructor() {}
  async handle(request: IRequest): Promise<IResponse> {
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    if (!request.patientId) {
      return {
        statusCode: 400,
        body: {
          error: 'Patient not found',
        },
      };
    }

    return {
      statusCode: 200,
      body: {
        message: request.body,
      },
    };
  }
}
`,
          },
          {
            type: 'file',
            name: 'controller.spec.ts',
            content: (inputs) =>
              `import { IRequest } from '../../../../interfaces/controller';

import { ${toPascalCase(inputs.name)}Controller } from './controller';

describe('${toPascalCase(inputs.name)}Controller', () => {
  let mockRequest: IRequest
  let controller: ${toPascalCase(inputs.name)}Controller;

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

    controller = new ${toPascalCase(inputs.name)}Controller();
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
`,
          },
        ],
      },
    ],
  };
});
