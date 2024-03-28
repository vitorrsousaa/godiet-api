// src/tests/auth.test.ts
import { describe, expect, it } from 'vitest';

import { handler } from '../server/functions/auth/signup';

import { IInvoke, Invoke } from './helpers/invokeFunction';

describe('/auth', async () => {
  describe('[POST] /auth/signup', async () => {
    let invoke: IInvoke;

    beforeAll(async () => {
      invoke = new Invoke(handler, 'POST /auth/signup');
    });

    it('Should signup', async () => {
      const body = {
        email: 'joaozinho@email.com',
        password: '123456789',
        name: 'Joãozinho',
        phone: '123456789',
      };
      const response = await invoke.execute({ body });

      console.log(response);

      expect(Boolean(response)).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        accessToken: expect.any(String),
      });
    });
  });
});
