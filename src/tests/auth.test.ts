// src/tests/auth.test.ts
import { describe, expect, it } from 'vitest';

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
  });
});
