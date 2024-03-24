import { makeRepositoryFavoriteMeal } from '@/factories/repositories/favoriteMeal/makeRepositoryFavoriteMeal';
import { makeFoodUtils } from '@/factories/utils/makeFoodUtils';
import { FindAllService } from '@/modules/favoriteMeal/services/FindAll';

export function makeServiceFindAllFavoriteMeal() {
  return new FindAllService(makeRepositoryFavoriteMeal(), makeFoodUtils());
}
