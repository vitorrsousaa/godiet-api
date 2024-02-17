import { type Prisma, PrismaClient } from '@prisma/client';

interface TAnamnesis {
  id: string;
  userId: string;
  patientId: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  title: string;
}

export interface IAnamnesisRepository {
  create(createAnamnesisDTO: Prisma.AnamnesisCreateArgs): Promise<TAnamnesis>;
  update(updateAnamnesisArgs: Prisma.AnamnesisUpdateArgs): Promise<TAnamnesis>;
  findAll(
    findAllAnamnesisArgs: Prisma.AnamnesisFindManyArgs
  ): Promise<TAnamnesis[]>;
  delete(deleteAnamnesisArgs: Prisma.AnamnesisDeleteArgs): Promise<TAnamnesis>;
}

export class AnamnesisRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createAnamnesisDTO: Prisma.AnamnesisCreateArgs) {
    return this.prismaService.anamnesis.create(createAnamnesisDTO);
  }

  async update(updateAnamnesisArgs: Prisma.AnamnesisUpdateArgs) {
    return this.prismaService.anamnesis.update(updateAnamnesisArgs);
  }

  async findAll(findAllAnamnesisArgs: Prisma.AnamnesisFindManyArgs) {
    return this.prismaService.anamnesis.findMany(findAllAnamnesisArgs);
  }

  async delete(deleteAnamnesisArgs: Prisma.AnamnesisDeleteArgs) {
    return this.prismaService.anamnesis.delete(deleteAnamnesisArgs);
  }
}
