import { prisma } from '@/database';
import { UserRepositories } from '@/repositories/user';

export function makeRepositoryUser() {
  return new UserRepositories(prisma);
}
