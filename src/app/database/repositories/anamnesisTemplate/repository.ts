/* eslint-disable indent */
import { TAnamnesisTemplate } from '@/entities/anamnesisTemplate';

import { type Prisma, PrismaClient } from '@prisma/client';

export interface IAnamnesisTemplateRepository {
  create(
    createAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateArgs
  ): Promise<TAnamnesisTemplate>;

  createMany(
    createManyAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateManyArgs
  ): Promise<Prisma.BatchPayload>;

  findMany(
    findManyAnamnesisTemplateArgs: Prisma.AnamnesisTemplateFindManyArgs
  ): Promise<TAnamnesisTemplate[]>;
}

export class AnamnesisTemplateRepositories
  implements IAnamnesisTemplateRepository
{
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateArgs) {
    return this.prismaService.anamnesisTemplate.create(
      createAnamnesisTemplateDTO
    );
  }

  async createMany(
    createManyAnamnesisTemplateDTO: Prisma.AnamnesisTemplateCreateManyArgs
  ) {
    return this.prismaService.anamnesisTemplate.createMany(
      createManyAnamnesisTemplateDTO
    );
  }

  async findMany(
    findManyAnamnesisTemplateArgs: Prisma.AnamnesisTemplateFindManyArgs
  ) {
    return this.prismaService.anamnesisTemplate.findMany(
      findManyAnamnesisTemplateArgs
    );
  }
}
