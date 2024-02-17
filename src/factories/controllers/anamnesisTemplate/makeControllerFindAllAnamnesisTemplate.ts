import { makeServiceFindAllAnamnesisTemplate } from '@/factories/services/anamnesisTemplate/makeServiceFindAllAnamnesisTemplate';
import { FindAllController } from '@/modules/anamnesisTemplate/controllers/FindAll';

export function makeControllerFindAllAnamnesisTemplate() {
  return new FindAllController(makeServiceFindAllAnamnesisTemplate());
}
