import { TFavoriteMeal } from '@/entities/favoriteMeal';
import { IFavoriteMealRepositories } from '@/repositories/favoritesMeal';
import { clearAllMocks, fn, SpyInstance, spyOn } from '@/tests';

import {
  CreateService,
  ICreateInput,
  ICreateOutput,
  ICreateService,
} from './service';

describe('Create favorite meal service', () => {
  let service: ICreateService;

  let spy = {
    'favoriteMealRepositories.create': {} as SpyInstance<
      IFavoriteMealRepositories['create']
    >,
  };

  beforeEach(() => {
    const favoriteMealsRepositoriesInstance = {
      create: fn(),
    } as unknown as IFavoriteMealRepositories;

    spy = {
      'favoriteMealRepositories.create': spyOn(
        favoriteMealsRepositoriesInstance,

        'create'
      ),
    };

    service = new CreateService(favoriteMealsRepositoriesInstance);
  });

  afterEach(() => {
    clearAllMocks();
  });

  it('should create favorite meal and return the name', async () => {
    // Arrange
    const exampleOutput: TFavoriteMeal = {
      name: 'Favorite Meal',
      id: 'any_id',
    };
    spy['favoriteMealRepositories.create'].mockResolvedValue(exampleOutput);

    const createInput: ICreateInput = {
      userId: 'user-id',
      favoriteMeal: {
        name: 'Favorite Meal',
        mealFoods: [
          {
            qty: 1,
            measure: {
              name: 'measure-name',
              qty: 2,
            },
            name: 'meal-food-name',
            foodId: 'food-id',
          },
        ],
      },
    };

    // Execução do serviço de criação
    const result: ICreateOutput = await service.execute(createInput);

    // Verificação de que o método create do repositório foi chamado corretamente
    expect(spy['favoriteMealRepositories.create']).toHaveBeenCalledWith({
      data: {
        name: createInput.favoriteMeal.name,
        userId: createInput.userId,
        mealFoods: {
          create: createInput.favoriteMeal.mealFoods.map((mealFood) => ({
            foodId: mealFood.foodId,
            measure: mealFood.measure,
            qty: mealFood.qty,
          })),
        },
      },
    });

    // Verificação de que o serviço retornou os dados esperados
    expect(result).toEqual(exampleOutput);
  });
});
