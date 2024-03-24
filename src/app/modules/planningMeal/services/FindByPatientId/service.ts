import { TPlanningMeal } from '@/entities/planningMeal';
import { IFoodUtils } from '@/modules/food/utils/food';
import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPlanningId } from '../../errors/invalidPlanningId';

export const FindByPatientIdServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TFindByPatientId = z.infer<typeof FindByPatientIdServiceSchema>;

export type IFindByPatientIdInput = TFindByPatientId;

export type TPlanningOutput = TPlanningMeal;

export type IFindByPatientIdOutput = TPlanningOutput[];

export interface IFindByPatientIdService {
  execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput>;
}

export class FindByPatientIdService implements IFindByPatientIdService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories,
    private readonly foodUtils: IFoodUtils
  ) {}

  async execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput> {
    const { userId, patientId } = findByPatientIdInput;

    try {
      const planning = (await this.planningMealRepositories.findAll({
        where: {
          userId,
          patientId,
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
      })) as unknown as TPlanningOutput[];

      return planning;
    } catch {
      throw new InvalidPlanningId();
    }
  }
}
