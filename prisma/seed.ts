import { PrismaClient } from '@prisma/client';

// import { generateCategoryBaseForSeeding } from './seeders/category';
import { generateCategoryBaseForSeeding } from './seeders/category';
import { generateFoodBaseForSeeding } from './seeders/food';
import { fixUnits } from './updates/foods/fixUnit';

const prisma = new PrismaClient();

async function main() {
  const categoryList = generateCategoryBaseForSeeding();

  const categoryCount = await prisma.categoryName.count();

  if (categoryCount > 0) {
    console.log('📦 The category seed has already created');
    return;
  }

  console.log('📦 Creating categories');

  await prisma.categoryName.createMany({
    data: categoryList,
  });

  const foodCount = await prisma.food.count();

  if (foodCount > 0) {
    console.log('📦 The food seed has already created');

    return;
  }

  const categoriesCreated = await prisma.categoryName.findMany();

  const foodList = generateFoodBaseForSeeding(categoriesCreated);

  console.log('📦 Creating foods');

  await prisma.food.createMany({
    data: foodList,
  });

  await fixUnits();
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
