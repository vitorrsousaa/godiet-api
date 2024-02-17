import { prisma } from '@/database';
import { AnamnesisRepositories } from '@/repositories/anamnesis/repository';

export function makeRepositoryAnamnesis() {
  return new AnamnesisRepositories(prisma);
}
