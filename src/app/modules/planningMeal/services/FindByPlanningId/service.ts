import { TPlanningMeal } from '@/entities/planningMeal';
import { IPlanningMealRepositories } from '@/repositories/planningMeal';

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

    try {
      const planningMeal = (await this.planningMealRepositories.findFirst({
        where: {
          id: planningId,
          patientId,
          userId,
        },
        include: {
          meals: {
            include: {
              mealFoods: {
                include: {
                  food: true,
                },
              },
            },
          },
        },
      })) as unknown as TPlanningMeal;

      if (!planningMeal) throw new InvalidPlanningId();

      return planningMeal;
    } catch {
      throw new InvalidPlanningId();
    }
  }
}
