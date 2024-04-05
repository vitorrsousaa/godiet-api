import foodList from '../data/foodList.json';
import { fixUnitForEachFood } from '../updates/foods/fixUnit';
import { updateMeasuresForEachFood } from '../updates/foods/updateMeasures';

export function generateFoodBaseForSeeding() {
  const newFoodListWithCorrectAttribute = foodList.map((food) => ({
    ...food,
    attributes: fixUnitForEachFood(food.attributes),
  }));

  const newFoodListWithCorrectMeasures = newFoodListWithCorrectAttribute.map(
    (food) => ({
      ...food,
      measures: updateMeasuresForEachFood(food.measures),
    })
  );

  return newFoodListWithCorrectMeasures;
}
