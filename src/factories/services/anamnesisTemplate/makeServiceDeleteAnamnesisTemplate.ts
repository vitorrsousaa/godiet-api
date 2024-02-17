import { makeRepositoryAnamnesisTemplate } from '@/factories/repositories/anamnesisTemplate/makeRepositoryAnamnesisTemplate';
import { DeleteService } from '@/modules/anamnesisTemplate/services/Delete';

export function makeServiceDeleteAnamnesisTemplate() {
  return new DeleteService(makeRepositoryAnamnesisTemplate());
}
