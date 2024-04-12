import { PrismaClient } from '@prisma/client';

import { templates } from '../../../src/app/constants/observationTemplate';

const prisma = new PrismaClient();

export async function seedDatabase() {
  const users = await prisma.user.findMany({
    include: {
      observationTemplate: true,
    },
  });

  users.forEach(async (user) => {
    user.observationTemplate.length === 0 &&
      (await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          observationTemplate: {
            createMany: {
              data: templates,
            },
          },
        },
      }));
  });

  console.log('Updated users with observation templates...');
}

seedDatabase();
