import { IFoodRepositories } from '@/repositories/food';

import * as z from 'zod';

import { InvalidFoodId } from '../../errors/invalidFoodId';

export const ValidateFoodIdServiceSchema = z.object({
  foodIds: z.array(z.string().uuid()),
});

export type TValidateFoodId = z.infer<typeof ValidateFoodIdServiceSchema>;

export type IValidateFoodIdInput = TValidateFoodId;

export type IValidateFoodIdOutput = boolean;

export interface IValidateFoodIdService {
  execute(
    validateFoodIdInput: IValidateFoodIdInput
  ): Promise<IValidateFoodIdOutput>;
}

export class ValidateFoodIdService implements IValidateFoodIdService {
  constructor(private readonly foodRepositories: IFoodRepositories) {}

  async execute(
    validateFoodIdInput: IValidateFoodIdInput
  ): Promise<IValidateFoodIdOutput> {
    const { foodIds } = validateFoodIdInput;

    try {
      const findFood = await this.foodRepositories.findAllByIds(foodIds);

      if (!findFood) {
        throw new InvalidFoodId();
      }
    } catch (error) {
      console.log({ error });
      throw new InvalidFoodId();
    }

    return true;
  }
}
