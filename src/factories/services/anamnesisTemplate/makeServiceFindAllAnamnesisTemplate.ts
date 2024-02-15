import { makeRepositoryAnamnesisTemplate } from '@/factories/repositories/anamnesisTemplate/makeRepositoryAnamnesisTemplate';
import { FindAllService } from '@/modules/anamnesisTemplate/services/FindAll';

export function makeServiceFindAllAnamnesisTemplate() {
  return new FindAllService(makeRepositoryAnamnesisTemplate());
}
