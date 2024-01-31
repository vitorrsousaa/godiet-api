import { prisma } from '@/database';
import { CategoryNameRepositories } from '@/repositories/categoryName';

export function makeRepositoryCategoryName() {
  return new CategoryNameRepositories(prisma);
}
