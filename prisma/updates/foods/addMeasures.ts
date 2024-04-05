import { PrismaClient } from '@prisma/client';

import foodList from '../../data/foodList.json';

const prisma = new PrismaClient();

export async function addMeasures() {
  const foods = await prisma.food.findMany();

  let countUpdated = 0;
  const foodsWithoutMeasures: unknown[] = [];

  foods.forEach(async (food) => {
    const originalFood = foodList.find((list) => list.name === food.name);
    let measures = [];

    if (!originalFood) {
      foodsWithoutMeasures.push(food);
      measures = [{ name: 'gramas', qty: 1 }];
    } else {
      measures = originalFood.measures;
    }

    await prisma.food
      .update({
        where: {
          id: food.id,
        },
        data: {
          measures,
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
