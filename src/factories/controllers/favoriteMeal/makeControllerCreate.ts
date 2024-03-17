import { makeServiceCreateFavoriteMeal } from '@/factories/services/favoriteMeal/makeServiceCreateFavoriteMeal';
import { CreateController } from '@/modules/favoriteMeal/controllers/Create';

export function makeControllerCreate() {
  return new CreateController(makeServiceCreateFavoriteMeal());
}
