import { TFavoriteMeal, TMealFood } from '@/entities/favoriteMeal';
import { IFoodUtils } from '@/modules/food/utils/food';
import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  userId: z.string().uuid(),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;

export type IFindAllOutput = TFavoriteMeal[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

type TFavoriteMealFoodWithMealFood = TFavoriteMeal & { mealFoods: TMealFood[] };

export class FindAllService implements IFindAllService {
  constructor(
    private readonly favoriteMealRepositories: IFavoriteMealRepositories,
    private readonly foodUtils: IFoodUtils
  ) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { userId } = findAllInput;

    const allFavorites = (await this.favoriteMealRepositories.findAll({
      where: {
        userId,
      },
      include: {
        mealFoods: {
          include: {
            food: true,
          },
        },
      },
    })) as TFavoriteMealFoodWithMealFood[];

    return allFavorites.map(this.mapperMealFoods);
  }

  private mapperMealFoods(
    favoriteMeal: TFavoriteMealFoodWithMealFood
  ): TFavoriteMeal {
    const { mealFoods } = favoriteMeal;

    const newMealFoods = mealFoods.map((mealFood) => {
      const { food, ...restOfMealFood } = mealFood;
      const { attributes, ...restOfFoods } = food;

      return {
        ...restOfMealFood,
        food: {
          ...restOfFoods,
          attributes: attributes.map((attribute) =>
            this.foodUtils.calculateAttributes({
              attribute,
              baseQty: food.baseQty,
              qty: mealFood.qty,
              measure: mealFood.measure,
            })
          ),
        },
      };
    });

    return {
      ...favoriteMeal,
      mealFoods: newMealFoods,
    };
  }
}
