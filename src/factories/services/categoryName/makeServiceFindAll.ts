import { makeRepositoryCategoryName } from '@/factories/repositories/categoryName/makeRepositoryCategoryName';
import { FindAllService } from '@/modules/categoryName/services/FindAll';

export function makeServiceFindAll() {
  return new FindAllService(makeRepositoryCategoryName());
}
