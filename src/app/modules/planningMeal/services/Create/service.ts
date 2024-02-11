import { IPatientRepositories } from '@/repositories/patient';
import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPatient } from '../../errors/invalidPatient';

export const CreateMealFoodSchema = z.object({
  portion: z.number().min(0),
  options: z.array(z.string().uuid()),
});

export const CreateMealSchema = z.object({
  name: z.string(),
  time: z.string(),
  foods: z.array(CreateMealFoodSchema),
});

export const CreatePlanningServiceSchema = z.object({
  name: z.string(),
  meals: z.array(CreateMealSchema),
});

export type TCreatePlanningMeal = z.infer<typeof CreatePlanningServiceSchema>;

export interface ICreateInput {
  planningMeal: TCreatePlanningMeal;
  patientId: string;
  userId: string;
}

export interface ICreateOutput {
  name: string;
}

export interface ICreateService {
  execute(createInput: ICreateInput): Promise<ICreateOutput>;
}

export class CreateService implements ICreateService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories,
    private readonly patientRepositories: IPatientRepositories
  ) {}

  async execute(createInput: ICreateInput): Promise<ICreateOutput> {
    const { patientId, planningMeal, userId } = createInput;

    const isPatientOwnership = await this.validatePatientOwnership(
      userId,
      patientId
    );

    if (!isPatientOwnership) {
      throw new InvalidPatient();
    }

    return this.planningMealRepositories.create({
      data: {
        name: planningMeal.name,
        patientId,
        userId,
        meals: {
          create: planningMeal.meals.map((meal) => ({
            name: meal.name,
            time: meal.time,
            foods: {
              create: meal.foods.map((food) => ({
                portion: food.portion,
                options: food.options,
              })),
            },
          })),
        },
      },
      include: {
        meals: {
          include: {
            foods: true,
          },
        },
      },
    });
  }

  private async validatePatientOwnership(userId: string, patientId: string) {
    const isPatientOwnership = await this.patientRepositories.findFirst({
      where: {
        id: patientId,
        userId,
      },
      select: {
        name: true,
      },
    });

    return isPatientOwnership;
  }
}
