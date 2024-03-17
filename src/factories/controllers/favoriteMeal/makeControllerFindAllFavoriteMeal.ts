import { makeServiceFindAllFavoriteMeal } from '@/factories/services/favoriteMeal/makeServiceFindAllFavoriteMeal';
import { FindAllController } from '@/modules/favoriteMeal/controllers/FindAll';

export function makeControllerFindAllFavoriteMeal() {
  return new FindAllController(makeServiceFindAllFavoriteMeal());
}
