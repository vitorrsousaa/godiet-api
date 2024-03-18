// src/tests/auth.test.ts
import { describe, expect, it } from 'vitest';

import { handler } from '../server/functions/auth/signup';

import prisma from './helpers/prisma';

describe('/auth', async () => {
  describe('[POST] /auth/signup', async () => {
    // tests will go here
    it('Shoudl correctly', async () => {
      const user = await prisma.user.create({
        data: {
          email: 'joaozinho@email.com',
          password: '123456789',
          name: 'Joãozinho',
        },
      });
      console.log(user);

      expect(user.name).toBe('Joãozinho');
    });

    it('Should signup', async () => {
      const response = await handler({
        headers: {},
        isBase64Encoded: false,
        rawPath: '/auth/signup',
        rawQueryString: '',
        routeKey: 'POST /auth/signup',
        version: '2.0',
        requestContext: {
          accountId: 'offlineContext_accountId',
          apiId: 'offlineContext_apiId',
          domainName: 'offlineContext_domainName',
          domainPrefix: 'offlineContext_domainPrefix',
          http: {
            method: 'POST',
            path: '/auth/signup',
            protocol: 'HTTP/1.1',
            sourceIp: '::1',
            userAgent: 'Insomnia/2023.5.6',
          },
          requestId: 'offlineContext_resourceId',
          routeKey: 'POST /auth/signup',
          stage: '$default',
          time: '18/Mar/2024:08:31:44 -0300',
          timeEpoch: 1710761504185,
        },
      });

      console.log(response);

      expect(Boolean(response)).toBeTruthy();
    });
  });
});
