import { CreateMealFoodSchema } from '@/entities/mealFood';
import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';

import * as z from 'zod';

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
            qty: mealFood.qty,
            name: mealFood.name,
          })),
        },
      },
    });
  }
}
