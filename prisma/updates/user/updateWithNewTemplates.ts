import { PrismaClient } from '@prisma/client';

import { templates } from '../../../src/app/constants/templateAnamnesis';

const prisma = new PrismaClient();

export async function seedDatabase() {
  const users = await prisma.user.findMany({
    include: {
      anamnesisTemplate: true,
    },
  });

  users.forEach(async (user) => {
    user.anamnesisTemplate.length === 0 &&
      (await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          anamnesisTemplate: {
            createMany: {
              data: templates,
            },
          },
        },
      }));
  });
}
