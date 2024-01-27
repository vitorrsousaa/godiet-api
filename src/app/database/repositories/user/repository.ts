import { type Prisma, PrismaClient } from '@prisma/client';

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserRepositories {
  create(createDTO: Prisma.UserCreateArgs): Promise<TUser>;
  findUnique(findUniqueDTO: Prisma.UserFindUniqueArgs): Promise<TUser | null>;
}

class UserRepositories implements IUserRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createDTO: Prisma.UserCreateArgs): Promise<TUser> {
    return this.prismaService.user.create(createDTO);
  }

  async findUnique(
    findUniqueDTO: Prisma.UserFindUniqueArgs
  ): Promise<TUser | null> {
    return this.prismaService.user.findUnique(findUniqueDTO);
  }
}

export { UserRepositories };
