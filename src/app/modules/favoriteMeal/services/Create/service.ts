import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';

import * as z from 'zod';

export const CreateMealFoodSchema = z.object({
  qty: z.number().min(0),
  measure: z.object({
    name: z.string(),
    qty: z.number().min(0),
  }),
  options: z.array(
    z.object({
      foodId: z.string().uuid(),
      foodName: z.string(),
      measure: z.string(),
      qty: z.number().min(0),
    })
  ),
  foodId: z.string().uuid(),
});

export const CreateFavoriteMeal = z.object({
  name: z.string(),
  mealFoods: z.array(CreateMealFoodSchema).min(1),
});

export const CreateServiceSchema = z.object({
  userId: z.string().uuid(),
  favoriteMeal: CreateFavoriteMeal,
});

export type TCreate = z.infer<typeof CreateServiceSchema>;

export type ICreateInput = TCreate;

export interface ICreateOutput {
  name: string;
}

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(
    private readonly favoriteMealRepositories: IFavoriteMealRepositories
  ) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { favoriteMeal, userId } = createInput;
    const { name, mealFoods } = favoriteMeal;

    return this.favoriteMealRepositories.create({
      data: {
        name,
        userId,
        mealFoods: {
          create: mealFoods.map((mealFood) => ({
            foodId: mealFood.foodId,
            measure: mealFood.measure,
            options: mealFood.options,
            qty: mealFood.qty,
          })),
        },
      },
    });
  }
}
