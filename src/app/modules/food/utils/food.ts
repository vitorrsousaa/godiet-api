import { TAttribute, TMeasure } from '@/entities/food';

interface CalculateAttributesInput {
  baseQty: number;
  attribute: TAttribute;
  qty: number;
  measure: TMeasure;
}

export interface IFoodUtils {
  calculateAttributes(
    calculateAttributesInput: CalculateAttributesInput
  ): TAttribute;
}

export class FoodUtils implements IFoodUtils {
  public calculateAttributes(
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
}
