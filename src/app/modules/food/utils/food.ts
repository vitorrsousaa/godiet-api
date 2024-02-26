import { TFood } from '@/entities/food';

export interface IFoodUtils {
  getFoodByPortion: (food: TFood, portion: number) => TFood;
}

export class FoodUtils implements IFoodUtils {
  public getFoodByPortion(food: TFood, portion: number): TFood {
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
