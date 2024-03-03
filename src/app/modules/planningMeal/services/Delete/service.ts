import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { PlanningNotFound } from '../../errors/planningNotFound';

export const DeleteServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  planningMealId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export interface IDeleteService {
  execute(deleteInput: IDeleteInput): Promise<IDeleteOutput>;
}

export class DeleteService implements IDeleteService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories
  ) {}

  async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
    const { patientId, planningMealId, userId } = deleteInput;
    try {
      await this.planningMealRepositories.delete({
        where: {
          id: planningMealId,
          userId,
          patientId,
        },
      });

      return null;
    } catch {
      throw new PlanningNotFound();
    }
  }
}
