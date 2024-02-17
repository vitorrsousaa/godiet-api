import { makeServiceDeleteAnamnesisTemplate } from '@/factories/services/anamnesisTemplate/makeServiceDeleteAnamnesisTemplate';
import { DeleteController } from '@/modules/anamnesisTemplate/controllers/Delete';

export function makeControllerDeleteAnamnesisTemplate() {
  return new DeleteController(makeServiceDeleteAnamnesisTemplate());
}
