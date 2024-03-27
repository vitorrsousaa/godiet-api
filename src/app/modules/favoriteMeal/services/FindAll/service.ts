import { TFavoriteMeal } from '@/entities/favoriteMeal';
import { TAttribute, TMeasure } from '@/entities/food';
import { TMealFood } from '@/entities/mealFood';
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

interface CalculateAttributesInput {
  baseQty: number;
  attribute: TAttribute;
  qty: number;
  measure: TMeasure;
}

type TFavoriteMealFoodWithMealFood = TFavoriteMeal & { mealFoods: TMealFood[] };

function calculateAttributes(
  calculateAttributesInput: CalculateAttributesInput
): TAttribute {
  const { attribute, baseQty, qty, measure } = calculateAttributesInput;

  const totalQty = qty * measure.qty;

  return {
    name: attribute.name,
    unit: attribute.unit,
    qty: (attribute.qty * totalQty) / baseQty,
  };
}

export class FindAllService implements IFindAllService {
  constructor(
    private readonly favoriteMealRepositories: IFavoriteMealRepositories
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
            calculateAttributes({
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
