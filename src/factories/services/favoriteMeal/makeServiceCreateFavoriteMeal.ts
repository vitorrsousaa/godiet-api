import { makeRepositoryFavoriteMeal } from '@/factories/repositories/favoriteMeal/makeRepositoryFavoriteMeal';
import { CreateService } from '@/modules/favoriteMeal/services/Create';

export function makeServiceCreateFavoriteMeal() {
  return new CreateService(makeRepositoryFavoriteMeal());
}
