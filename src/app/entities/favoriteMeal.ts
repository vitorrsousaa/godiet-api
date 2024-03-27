import { TMealFood } from './mealFood';

export interface TFavoriteMeal {
  name: string;
  id: string;
  mealFoods?: TMealFood[];
}
