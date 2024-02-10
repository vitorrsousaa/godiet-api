import { TFood } from '@/entities/food';
import { IFoodRepositories } from '@/repositories/food';

import * as z from 'zod';

export const FindAllServiceSchema = z.object({
  categoryId: z.string().uuid().or(z.undefined()),
  portion: z
    .string()
    .refine((value) => {
      if (value === undefined) {
        return true;
      }

      const parsed = parseFloat(value);

      return !isNaN(parsed);
    })
    .transform((value) => parseFloat(value))
    .or(z.undefined()),
});

export type TFindAll = z.infer<typeof FindAllServiceSchema>;

export type IFindAllInput = TFindAll;
export type IFindAllOutput = TFood[];

export interface IFindAllService {
  execute(findAllInput: IFindAllInput): Promise<IFindAllOutput>;
}

export class FindAllService implements IFindAllService {
  constructor(private readonly foodRepositories: IFoodRepositories) {}

  async execute(findAllInput: IFindAllInput): Promise<IFindAllOutput> {
    const { categoryId, portion } = findAllInput;

    if (categoryId && portion) {
      const foods = await this.foodRepositories.findAll({
        where: {
          categoryNameId: categoryId,
        },
        include: {
          categoryName: true,
        },
      });

      return foods.map((food) => this.getFoodByPortion(food, portion));
    }

    if (categoryId) {
      const tes = await this.foodRepositories.findAll({
        where: {
          categoryNameId: findAllInput.categoryId,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return tes;
    }

    return this.foodRepositories.findAll({
      orderBy: {
        name: 'asc',
      },
    });
  }

  private getFoodByPortion(food: TFood, portion: number): TFood {
    const category = food.categoryName;
    const baseFood = {
      baseUnit: food.baseUnit,
      categoryNameId: food.categoryNameId,
      id: food.id,
      name: food.name,
      categoryName: food.categoryName,
    };

    if (!category) {
      return {
        ...baseFood,
        baseQty: food.baseQty,
        attributes: food.attributes,
      };
    }

    let originalAttribute = food.attributes?.find(
      (attribute) =>
        typeof attribute.qty === 'number' && attribute.name === 'protein'
    );

    if (!originalAttribute) {
      originalAttribute = food.attributes?.find(
        (attribute) =>
          typeof attribute.qty === 'number' && attribute.name === 'energy'
      );
    }

    if (!originalAttribute) {
      return {
        ...baseFood,
        baseQty: food.baseQty,
        attributes: food.attributes,
      };
    }

    const originalBaseQty = food.baseQty;

    const originalPortion = portion > 0 ? portion : 1;

    const originalQty = originalAttribute?.qty;

    const newBaseQty =
      ((originalBaseQty * category.baseProtein) /
        (Number.parseFloat(originalQty.toString()) || 1)) *
      originalPortion;

    const newAttributes = food.attributes?.map((attribute) => {
      if (attribute.qty === undefined) {
        return attribute;
      }

      if (attribute.unit === 'percents') {
        return attribute;
      }

      if (typeof attribute.qty !== 'number') {
        return attribute;
      }

      return {
        ...attribute,
        qty: (attribute.qty * newBaseQty) / originalBaseQty,
      };
    });

    return {
      ...baseFood,
      baseQty: newBaseQty,
      attributes: newAttributes,
    };
  }
}
