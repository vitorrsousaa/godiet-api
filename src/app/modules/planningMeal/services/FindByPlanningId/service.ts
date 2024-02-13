import {
  IPlanningMealRepositories,
  TPlanningMeal,
} from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPlanningId } from '../../errors/invalidPlanningId';

export const FindByPlanningIdServiceSchema = z.object({
  planningId: z.string(),
  userId: z.string(),
  patientId: z.string(),
});

export type TFindByPlanningId = z.infer<typeof FindByPlanningIdServiceSchema>;

export type IFindByPlanningIdInput = TFindByPlanningId;

export type IFindByPlanningIdOutput = TPlanningMeal | null;

export interface IFindByPlanningIdService {
  execute(
    findByPlanningIdInput: IFindByPlanningIdInput
  ): Promise<IFindByPlanningIdOutput>;
}

export class FindByPlanningIdService implements IFindByPlanningIdService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories
  ) {}

  async execute(
    findByPlanningIdInput: IFindByPlanningIdInput
  ): Promise<IFindByPlanningIdOutput> {
    const { planningId, patientId, userId } = findByPlanningIdInput;

    const planningMeal = await this.planningMealRepositories.findFirst({
      where: {
        id: planningId,
        patientId,
        userId,
      },
    });

    if (!planningMeal) {
      throw new InvalidPlanningId();
    }

    return planningMeal;
  }
}
