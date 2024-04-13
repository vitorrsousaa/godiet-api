import * as z from 'zod';

export const CreateMealFoodSchema = z.object({
  qty: z.number().min(0),
  measure: z.object({
    name: z.string(),
    qty: z.number().min(0),
  }),
  name: z.string(),
  foodId: z.string().uuid(),
});

export const CreateMealSchema = z.object({
  name: z.string(),
  time: z.string(),
  observation: z.string(),
  mealFoods: z.array(CreateMealFoodSchema),
});

export const CreatePlanningServiceSchema = z.object({
  name: z.string(),
  meals: z.array(CreateMealSchema),
});
