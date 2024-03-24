import { TAttribute, TMeasure } from '@/entities/food';

interface CalculateAttributesInput {
  baseQty: number;
  attribute: TAttribute;
  qty: number;
  measure: TMeasure;
}

type CalculateAttributesOutput = TAttribute;

export function calculateAttributes(
  calculateAttributesInput: CalculateAttributesInput
): CalculateAttributesOutput {
  const { attribute, baseQty, qty, measure } = calculateAttributesInput;

  const totalQty = qty * measure.qty;

  return {
    name: attribute.name,
    unit: attribute.unit,
    qty: (attribute.qty * totalQty) / baseQty,
  };
}
