import { makeRepositoryFavoriteMeal } from '@/factories/repositories/favoriteMeal/makeRepositoryFavoriteMeal';
import { DeleteService } from '@/modules/favoriteMeal/services/Delete';

export function makeServiceDeleteFavoriteMeal() {
  return new DeleteService(makeRepositoryFavoriteMeal());
}
