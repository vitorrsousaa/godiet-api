export type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryNameId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>[];
};
