import * as z from 'zod';

import { MeasureSchema, TFood, TMeasure } from './food';

export const CreateMealFoodSchema = z.object({
  qty: z.number().min(0),
  measure: MeasureSchema,
  name: z.string(),
  foodId: z.string().uuid(),
});

export type TCreateMealFood = z.infer<typeof CreateMealFoodSchema>;

export type TMealFood = {
  id: string;
  measure: TMeasure;
  qty: number;
  options: [];
  foodId: string;
  food: TFood;
};
