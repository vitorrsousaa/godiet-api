import { TFood } from '@/entities/food';
import { IFoodUtils } from '@/modules/food/utils/food';
import { IFoodRepositories } from '@/repositories/food';
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

export type IFindByPlanningIdOutput = TPlanningMealCompleteDomain | null;

type TFoods = {
  id: string;
  portion: number;
  mealId: string;
  categoryNameId: string;
  options: string[];
};

type TMeal = {
  id: string;
  name: string;
  time: string;
  planningMealId: string;
  foods: TFoods[];
};

type TPlanningMealComplete = TPlanningMeal & {
  meals: TMeal[];
};

interface TFoodsDomain extends Omit<TFoods, 'options'> {
  options: TFood[];
}

interface TMealDomain extends Omit<TMeal, 'foods'> {
  foods: TFoodsDomain[];
}

type TPlanningMealCompleteDomain = TPlanningMeal & {
  meals: TMealDomain[];
};

export interface IFindByPlanningIdService {
  execute(
    findByPlanningIdInput: IFindByPlanningIdInput
  ): Promise<IFindByPlanningIdOutput>;
}

export class FindByPlanningIdService implements IFindByPlanningIdService {
  constructor(
    private readonly planningMealRepositories: IPlanningMealRepositories,
    private readonly foodRepositories: IFoodRepositories,
    private readonly foodUtils: IFoodUtils
  ) {}

  async execute(
    findByPlanningIdInput: IFindByPlanningIdInput
  ): Promise<IFindByPlanningIdOutput> {
    const { planningId, patientId, userId } = findByPlanningIdInput;

    const planningMeal = (await this.planningMealRepositories.findFirst({
      where: {
        id: planningId,
        patientId,
        userId,
      },
      include: {
        meals: {
          include: {
            foods: true,
          },
        },
      },
    })) as unknown as TPlanningMealComplete;

    if (!planningMeal) {
      throw new InvalidPlanningId();
    }

    const foodIds = this.getFoodIds(planningMeal);

    const foods = await this.foodRepositories.findAll({
      where: {
        id: {
          in: foodIds,
        },
      },
    });

    const newPlanningMealToDomain = this.mapperPlanningMeal(
      planningMeal,
      foods
    );

    return newPlanningMealToDomain;
  }

  private getFoodIds(planningMeal: TPlanningMealComplete): string[] {
    const meals = planningMeal.meals.map((meal) => meal.foods).flat();
    const ids = meals.map((meal) => meal.options).flat();

    return ids;
  }

  private mapperPlanningMeal(
    planningMeal: TPlanningMealComplete,
    foods: TFood[]
  ): TPlanningMealCompleteDomain {
    return {
      createdAt: planningMeal.createdAt,
      id: planningMeal.id,
      updatedAt: planningMeal.updatedAt,
      patientId: planningMeal.patientId,
      userId: planningMeal.userId,
      name: planningMeal.name,
      meals: planningMeal.meals.map((meal) => this.mapperMeals(meal, foods)),
    };
  }

  private mapperMeals(meal: TMeal, foods: TFood[]): TMealDomain {
    return {
      id: meal.id,
      name: meal.name,
      time: meal.time,
      planningMealId: meal.planningMealId,
      foods: meal.foods.map((food) => this.mapperFoods(food, foods)),
    };
  }

  private mapperFoods(food: TFoods, foods: TFood[]): TFoodsDomain {
    const { portion } = food;
    return {
      categoryNameId: food.categoryNameId,
      id: food.id,
      mealId: food.mealId,
      portion: portion,
      options: food.options
        .map((option) => foods.find((food) => food.id === option))
        .filter((food): food is TFood => food !== undefined)
        .map((food) => this.foodUtils.getFoodByPortion(food, portion)),
    };
  }
}
