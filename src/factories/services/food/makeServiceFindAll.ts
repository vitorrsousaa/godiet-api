import { makeRepositoryFood } from '@/factories/repositories/food/makeRepositoryFood';
import { makeFoodUtils } from '@/factories/utils/makeFoodUtils';
import { FindAllService } from '@/modules/food/services/FindAll';

export function makeServiceFindAll() {
  return new FindAllService(makeRepositoryFood(), makeFoodUtils());
}
