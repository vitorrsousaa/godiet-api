import { makeServiceDeleteFavoriteMeal } from '@/factories/services/favoriteMeal/makeServiceDeleteFavoriteMeal';
import { DeleteController } from '@/modules/favoriteMeal/controllers/Delete';

export function makeControllerDelete() {
  return new DeleteController(makeServiceDeleteFavoriteMeal());
}
