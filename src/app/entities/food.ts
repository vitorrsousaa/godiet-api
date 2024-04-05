import * as z from 'zod';

export const MeasureSchema = z.object({
  qty: z.number().min(0),
  name: z.string(),
});

export type TAttribute = {
  qty: number;
  name: string;
  unit: string;
};
export type TMeasure = z.infer<typeof MeasureSchema>;

export type TFood = {
  id: string;
  name: string;
  baseQty: number;
  baseUnit: string;
  attributes: TAttribute[];
  categoryName: string;
  measures: TMeasure[];
};
