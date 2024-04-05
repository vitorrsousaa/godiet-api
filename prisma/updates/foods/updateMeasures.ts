import { PrismaClient } from '@prisma/client';

import type { Prisma } from '@prisma/client';

import foodList from '../../data/foodList.json';

const prisma = new PrismaClient();

export function updateMeasuresForEachFood(measures: Prisma.InputJsonObject[]) {
  const removeUnnecessaryMeasures = measures.filter(
    (measure) => measure.name !== 'a vontade'
  );

  removeUnnecessaryMeasures.push({ name: 'gramas', qty: 1 });

  return removeUnnecessaryMeasures;
}

export async function main() {
  console.log('initializing....');
  const foods = await prisma.food.findMany();

  let updated = 0;
  const errorArray: unknown[] = [];

  console.log('Total foods:', foods.length);

  foods.forEach(async (food) => {
    const originalFood = foodList.find((list) => list.name === food.name);
    if (!originalFood) {
      errorArray.push(food);
      console.log('Não encontrado:', food.name);
      return;
    }

    try {
      await prisma.food.update({
        where: {
          id: food.id,
        },
        data: {
          measures: originalFood.measures.filter(
            (measure) => measure.name !== 'a vontade'
          ),
        },
      });

      updated = updated + 1;
    } catch (error) {
      errorArray.push(food);
    }
  });

  console.log('total updated', updated);
  console.log('total with error', errorArray);

  console.log(foods.length);
  console.log('finished');
}

main();
