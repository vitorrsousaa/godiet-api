import { makeServiceCreateAnamnesisTemplates } from '@/factories/services/anamnesisTemplate/makeServiceCreateAnamnesisTemplates';
import { CreateController } from '@/modules/anamnesisTemplate/controllers/Create';

export function makeControllerCreateAnamnesisTemplate() {
  return new CreateController(makeServiceCreateAnamnesisTemplates());
}
