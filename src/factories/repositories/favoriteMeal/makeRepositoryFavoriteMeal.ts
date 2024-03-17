import { prisma } from '@/database';
import { FavoriteMealRepositories } from '@/repositories/favoritesMeal';

export function makeRepositoryFavoriteMeal() {
  return new FavoriteMealRepositories(prisma);
}
