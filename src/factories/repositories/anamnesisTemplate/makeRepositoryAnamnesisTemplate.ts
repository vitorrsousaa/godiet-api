import { prisma } from '@/database';
import { AnamnesisTemplateRepositories } from '@/repositories/anamnesisTemplate';

export function makeRepositoryAnamnesisTemplate() {
  return new AnamnesisTemplateRepositories(prisma);
}
