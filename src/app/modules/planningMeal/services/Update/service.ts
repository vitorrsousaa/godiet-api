import * as z from 'zod';

import { CreateMealSchema } from '../../entities/planningMeal';
import { PlanningNotFound } from '../../errors/planningNotFound';
import { ICreateService } from '../Create';
import { IDeleteService } from '../Delete';

export const CreatePlanningServiceSchema = z.object({
  name: z.string().min(1),
  meals: z.array(CreateMealSchema),
  createdAt: z.string(),
});

export const UpdateServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  planningMealId: z.string().uuid(),
  planningMeal: CreatePlanningServiceSchema,
});

export type TUpdate = z.infer<typeof UpdateServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = null;

export interface IUpdateService {
  execute(updateInput: IUpdateInput): Promise<IUpdateOutput>;
}

export class UpdateService implements IUpdateService {
  constructor(
    private readonly deleteService: IDeleteService,
    private readonly createService: ICreateService
  ) {}

  async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
    const { planningMealId, patientId, userId, planningMeal } = updateInput;

    try {
      await this.deleteService.execute({
        patientId,
        planningMealId,
        userId,
      });

      await this.createService.execute({
        patientId,
        userId,
        planningMeal,
      });

      return null;
    } catch {
      throw new PlanningNotFound();
    }
  }
}
