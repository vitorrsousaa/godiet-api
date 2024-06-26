// src/tests/helpers/prisma.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL,
    },
  },
});

export default prisma;
