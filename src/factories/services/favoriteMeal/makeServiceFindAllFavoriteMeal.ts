import { makeRepositoryFavoriteMeal } from '@/factories/repositories/favoriteMeal/makeRepositoryFavoriteMeal';
import { FindAllService } from '@/modules/favoriteMeal/services/FindAll';

export function makeServiceFindAllFavoriteMeal() {
  return new FindAllService(makeRepositoryFavoriteMeal());
}
