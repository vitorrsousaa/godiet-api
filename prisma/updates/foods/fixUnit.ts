import { PrismaClient } from '@prisma/client';

import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function fixUnits() {
  const foods = await prisma.food.findMany();

  let countUpdated = 0;

  const foodsWithoutMeasures: unknown[] = [];

  foods.forEach(async (food) => {
    const originalAttributes = food.attributes as unknown as Record<
      string,
      unknown
    >[];

    const newAttributes = originalAttributes.map((attribute) => {
      const { qty, name, unit } = attribute;

      return {
        name,
        unit,
        qty: typeof qty === 'string' ? (Number(qty) ? Number(qty) : 0) : qty,
      };
    }) as unknown as Prisma.InputJsonObject[];

    await prisma.food

      .update({
        where: {
          id: food.id,
        },

        data: {
          attributes: newAttributes,
        },
      })

      .catch((error) => {
        console.log('Error', food.name);

        console.log(error);
      })

      .then(() => {
        countUpdated = countUpdated + 1;
      });
  });

  console.log('Updated:', countUpdated);

  console.log('With error:', foodsWithoutMeasures);
}

fixUnits();
