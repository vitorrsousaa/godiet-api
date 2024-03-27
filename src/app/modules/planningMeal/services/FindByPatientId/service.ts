import { TPlanningMealWithMeals } from '@/entities/planningMeal';
import { calculateAttributes } from '@/modules/food/utils/food';
import { IPlanningMealRepositories } from '@/repositories/planningMeal';

import * as z from 'zod';

import { InvalidPlanningId } from '../../errors/invalidPlanningId';

export const FindByPatientIdServiceSchema = z.object({
  userId: z.string().uuid(),
  patientId: z.string().uuid(),
});

export type TFindByPatientId = z.infer<typeof FindByPatientIdServiceSchema>;

export type IFindByPatientIdInput = TFindByPatientId;

export type TPlanningOutput = TPlanningMealWithMeals;

export type TSummary = {
  prot: number;
  fat: number;
  carb: number;
  energy: number;
};

export type TPlanningMealWithSummary = TPlanningOutput & {
  summary: TSummary;
};

export type IFindByPatientIdOutput = TPlanningMealWithSummary[];

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

    try {
      const plannings = (await this.planningMealRepositories.findAll({
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

      const planningMealsWithCalculated = plannings.map(
        this.mapperPlanningMeal
      );

      return planningMealsWithCalculated.map(this.getCalculateSummary);
    } catch (error) {
      throw new InvalidPlanningId();
    }
  }

  private mapperPlanningMeal(
    planningMeal: TPlanningMealWithMeals
  ): TPlanningMealWithMeals {
    const { createdAt, id, meals, name, patientId, updatedAt, userId } =
      planningMeal;

    return {
      createdAt,
      id,
      name,
      patientId,
      updatedAt,
      userId,
      meals: meals.map((meal) => {
        return {
          ...meal,
          mealFoods: meal.mealFoods.map((mealFood) => {
            const { food, ...restOfMealFood } = mealFood;
            const { attributes, ...restOfFoods } = food;

            return {
              ...restOfMealFood,
              food: {
                ...restOfFoods,
                attributes: attributes.map((attribute) =>
                  calculateAttributes({
                    attribute,
                    baseQty: food.baseQty,
                    qty: mealFood.qty,
                    measure: mealFood.measure,
                  })
                ),
              },
            };
          }),
        };
      }),
    };
  }

  private getCalculateSummary(
    planningMeal: TPlanningMealWithMeals
  ): TPlanningMealWithSummary {
    const { meals } = planningMeal;

    const summary = meals.reduce(
      (acc, meal) => {
        const mealSummary = meal.mealFoods.reduce(
          (acc, mealFood) => {
            const { food } = mealFood;
            const proteinAttribute = food.attributes.find(
              (attribute) => attribute.name === 'protein'
            );

            const fatAttribute = food.attributes.find(
              (attribute) => attribute.name === 'lipid'
            );

            const carbAttribute = food.attributes.find(
              (attribute) => attribute.name === 'carbohydrate'
            );

            const energyAttribute = food.attributes.find(
              (attribute) => attribute.name === 'energy'
            );

            return {
              prot: acc.prot + (proteinAttribute?.qty || 0),
              fat: acc.fat + (fatAttribute?.qty || 0),
              carb: acc.carb + (carbAttribute?.qty || 0),
              energy: acc.energy + (energyAttribute?.qty || 0),
            };
          },
          { prot: 0, fat: 0, carb: 0, energy: 0 }
        );

        return {
          prot: acc.prot + mealSummary.prot,
          fat: acc.fat + mealSummary.fat,
          carb: acc.carb + mealSummary.carb,
          energy: acc.energy + mealSummary.energy,
        };
      },
      { prot: 0, fat: 0, carb: 0, energy: 0 }
    );

    return {
      ...planningMeal,
      summary,
    };
  }
}
