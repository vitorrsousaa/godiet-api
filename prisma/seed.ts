import { PrismaClient } from '@prisma/client';

import { generateFoodBaseForSeeding } from './seeders/food';

const prisma = new PrismaClient();

async function main() {
  const foodList = generateFoodBaseForSeeding();

  console.log('📦 Creating foods');

  await prisma.food.createMany({
    data: foodList,
  });
}

main()
  .then(() => {
    console.log('📦 Itens created with successful');
  })

  .catch(async (e) => {
    console.log(e);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
