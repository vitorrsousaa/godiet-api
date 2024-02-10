import { TCategoryName } from './categoryName';

export type TAttribute = {
  qty: number | string;
  name: string;
  unit: string;
};

export type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  categoryNameId: string;
  attributes?: TAttribute[];
  categoryName?: TCategoryName;
};
