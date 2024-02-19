import { makeRepositoryAnamnesisTemplate } from '@/factories/repositories/anamnesisTemplate/makeRepositoryAnamnesisTemplate';
import { CreateService } from '@/modules/anamnesisTemplate/services/Create';

export function makeServiceCreateAnamnesisTemplates() {
  return new CreateService(makeRepositoryAnamnesisTemplate());
}
