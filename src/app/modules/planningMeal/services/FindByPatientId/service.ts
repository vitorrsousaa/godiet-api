import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPlanningId } from '../../errors/invalidPlanningId';

export const FindByPatientIdServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TFindByPatientId = z.infer<typeof FindByPatientIdServiceSchema>;

export type IFindByPatientIdInput = TFindByPatientId;

export type IFindByPatientIdOutput = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  userId: string;
  patientId: string;
}[];

export interface IFindByPatientIdService {
  execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput>;
}

export class FindByPatientIdService implements IFindByPatientIdService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories
  ) {}

  async execute(
    findByPatientIdInput: IFindByPatientIdInput
  ): Promise<IFindByPatientIdOutput> {
    const { userId, patientId } = findByPatientIdInput;

    const planning = await this.planningMealRepositories.findAll({
      where: {
        userId,
        patientId,
      },
      include: {
        meals: {
          include: {
            foods: true,
          },
        },
      },
    });

    if (!planning) {
      throw new InvalidPlanningId();
    }

    return planning;
  }
}