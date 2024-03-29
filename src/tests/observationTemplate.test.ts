// src/tests/auth.test.ts
import { describe, expect, it } from 'vitest';

import { handler as handlerSignUp } from '../server/functions/auth/signup';
import { handler as handlerCreate } from '../server/functions/observationTemplate/create';
import { handler as handlerDelete } from '../server/functions/observationTemplate/delete';

import { IInvoke, Invoke } from './helpers/invokeFunction';

describe('/observation-template', () => {
  let accessToken: string;

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

  describe('[POST] /observation-template', async () => {
    let invoke: IInvoke;

    beforeAll(async () => {
      invoke = new Invoke(handlerCreate, 'POST /observation-template');
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

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.any(String),
        title: 'Title',
        text: 'Text',
      });
    });
  });

  describe('[DELETE] /observation-template/{id}', async () => {
    let invoke: IInvoke;
    let observationTemplateId: string;

    beforeAll(async () => {
      invoke = new Invoke(handlerDelete, 'DELETE /observation-template/{id}');
    });

    beforeEach(async () => {
      const invokeCreate = new Invoke(
        handlerCreate,
        'POST /observation-template'
      );
      const body = {
        title: 'Title',
        text: 'Text',
      };
      const created = await invokeCreate.execute({
        body,
        headers: { authorization: `Bearer ${accessToken}` },
      });

      console.log({ created });

      observationTemplateId = created.body.id as string;
    });

    it('Should delete observation template', async () => {
      console.log({ observationTemplateId });
      const response = await invoke.execute({
        body: {},
        headers: { authorization: `Bearer ${accessToken}` },
        params: { id: observationTemplateId },
      });

      console.log({ response: response.body });

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeNull();
    });
  });
});
