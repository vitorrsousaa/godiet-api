import { IPatientRepositories } from '@/repositories/patient';
import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPatient } from '../../errors/invalidPatient';

export const CreateMealFoodSchema = z.object({
  qty: z.number().min(0),
  measure: z.object({
    name: z.string(),
    qty: z.number().min(0),
  }),
  options: z.array(
    z.object({
      foodId: z.string().uuid(),
      foodName: z.string(),
      measure: z.string(),
      qty: z.number().min(0),
    })
  ),
  foodId: z.string().uuid(),
});

export const CreateMealSchema = z.object({
  name: z.string(),
  time: z.string(),
  mealFoods: z.array(CreateMealFoodSchema),
});

export const CreatePlanningServiceSchema = z.object({
  name: z.string(),
  meals: z.array(CreateMealSchema),
});

export const CreateServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
  planningMeal: CreatePlanningServiceSchema,
});

export type TCreatePlanningMeal = z.infer<typeof CreatePlanningServiceSchema>;

export type TCreateServiceInput = z.infer<typeof CreateServiceSchema>;

export type ICreateInput = TCreateServiceInput;

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

    const fixedDate = new Date('2000-01-01');

    return this.planningMealRepositories.create({
      data: {
        name: planningMeal.name,
        patientId,
        userId,
        meals: {
          create: planningMeal.meals.map((meal) => ({
            name: meal.name,
            time: `${fixedDate.toISOString().split('T')[0]}T${meal.time}:00.000Z`,
            mealFoods: {
              create: meal.mealFoods.map((mealFood) => ({
                measure: mealFood.measure,
                qty: mealFood.qty,
                options: mealFood.options,
                foodId: mealFood.foodId,
              })),
            },
          })),
        },
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
