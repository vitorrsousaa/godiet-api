import { prisma } from '@/database';
import { FoodRepositories } from '@/repositories/food';

export function makeRepositoryFood() {
  return new FoodRepositories(prisma);
}
