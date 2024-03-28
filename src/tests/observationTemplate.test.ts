// src/tests/auth.test.ts
import { describe, expect, it } from 'vitest';

import { handler as handlerSignUp } from '../server/functions/auth/signup';
import { handler } from '../server/functions/observationTemplate/create';

import { IInvoke, Invoke } from './helpers/invokeFunction';

describe('/observation-template', () => {
  describe('[POST] /observation-template/create', async () => {
    let invoke: IInvoke;
    let accessToken: string;

    beforeAll(async () => {
      invoke = new Invoke(handler, 'POST /observation-template/create');
    });

    beforeEach(async () => {
      const invokeSignUp = new Invoke(handlerSignUp, 'POST /auth/signup');
      const response = await invokeSignUp.execute({
        body: {
          email: 'user@email.com.br',
          password: '123456789',
          name: 'User Name',
          phone: '21998217563',
        },
      });

      accessToken = response.body.accessToken as string;
    });

    it('Should create an observation template', async () => {
      const body = {
        title: 'Title',
        text: 'Text',
      };
      const response = await invoke.execute({
        body,
        headers: { authorization: `Bearer ${accessToken}` },
      });

      console.log(response.body);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        title: 'Title',
        text: 'Text',
      });
    });
  });
});
