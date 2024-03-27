import { TFood, TMeasure } from '@/entities/food';

/**
 * Represents a food item within a meal.
 */
export interface TMealFood {
  /** The name of the food. */
  name: string;
  /** The measure of the food. */
  measure: TMeasure;
  /** The quantity of the food. */
  qty: number;
  /** The unique identifier of the food. */
  foodId: string;
  /** The unique identifier of the meal to which this food belongs. */
  mealId: string;
  /** The detailed information of the food. */
  food: TFood;
  /** The unique identifier of the meal-food association. */
  id: string;
}

/**
 * Represents a meal.
 */
export interface TMeal {
  /** The unique identifier of the meal. */
  id: string;
  /** The name of the meal. */
  name: string;
  /** The time at which the meal is planned. */
  time: Date;
  /** The unique identifier of the planning meal to which this meal belongs. */
  planningMealId: string;
  /** The list of foods included in this meal. */
  mealFoods: TMealFood[];
}

/**
 * Represents a planning meal.
 */
export interface TPlanningMeal {
  /** The unique identifier of the planning meal. */
  id: string;
  /** The date and time when the planning meal was created. */
  createdAt: Date;
  /** The date and time when the planning meal was last updated. */
  updatedAt: Date;
  /** The name of the planning meal. */
  name: string;
  /** The unique identifier of the user who owns this planning meal. */
  userId: string;
  /** The unique identifier of the patient associated with this planning meal. */
  patientId: string;
}

/**
 * Represents a planning meal with its associated meals.
 * This type is used when returning planning meals with their associated meals from the repository.
 */
export type TPlanningMealWithMeals = TPlanningMeal & {
  /** The list of meals associated with this planning meal. */
  meals: TMeal[];
};
