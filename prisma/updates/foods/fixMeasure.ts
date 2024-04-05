import { PrismaClient } from '@prisma/client';

import foodList from '../../data/foodList.json';

const prisma = new PrismaClient();

export async function fixMeasure() {
  console.log('initializing...');

  const foods = await prisma.food.findMany();

  foods.forEach(async (food) => {
    const originalFood = foodList.find((list) => list.name === food.name);

    if (!originalFood) return;

    const correctMeasures = originalFood.measures.filter(
      (measure) => measure.name !== 'a vontade'
    );

    if (!correctMeasures.find((measure) => measure.name === 'gramas')) {
      correctMeasures.push({ name: 'gramas', qty: 1 });
    }

    await prisma.food.update({
      where: {
        id: food.id,
      },
      data: {
        measures: correctMeasures,
      },
    });
  });
}

fixMeasure();
