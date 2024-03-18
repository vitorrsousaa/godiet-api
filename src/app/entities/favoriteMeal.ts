import { TFood, TMeasure } from './food';

export interface TMealFood {
  id: string;
  measure: TMeasure;
  qty: number;
  options: [];
  foodId: string;
  food: TFood;
}

export interface TFavoriteMeal {
  name: string;
  id: string;
  mealFoods: TMealFood[];
}