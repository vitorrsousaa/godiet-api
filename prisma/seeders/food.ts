import foodList from '../data/foodList.json';

type Category = {
  id: string;
  baseProtein: number;
  baseCarbo: number;
  baseFat: number;
  baseEnergy: number;
  name: string;
};

export function generateFoodBaseForSeeding(categories: Category[]) {
  const newFoodList = foodList.map((food) => {
    const findCategory = categories.find(
      (category) => category.name === food.categoryName
    );

    if (!findCategory) {
      throw new Error('Category not found');
    }

    return {
      baseQty: food.baseQty,
      baseUnit: food.baseUnit,
      name: food.name,
      attributes: food.attributes,
      categoryNameId: findCategory.id,
    };
  });

  return newFoodList;
}
