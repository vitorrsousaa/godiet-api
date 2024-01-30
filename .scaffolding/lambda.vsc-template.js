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
        title: 'Lambda Name',
        argumentName: 'name',
        defaultValue: 'Sample',
      },
    ],
    template: [
      {
        type: 'file',
        name: (inputs) => `${toCamelCase(inputs.name)}.ts`,
        content: (inputs) => `import {
  controllerAdapter,
  middlewareAdapter,
  responseAdapter,
} from '@/adapters';
import { makeMiddlewareAuthentication } from '@/factories/middlewares/makeMiddlewareAuthentication';

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEventV2) {
  const responseMiddleware = await middlewareAdapter(
    makeMiddlewareAuthentication(),
    event
  );

  if ('statusCode' in responseMiddleware) {
    return responseAdapter(responseMiddleware);
  }

  const response = await controllerAdapter(
    makeController(),
    event,
    responseMiddleware
  );

  return responseAdapter(response);
}
        `,
      },
    ],
  };
});
