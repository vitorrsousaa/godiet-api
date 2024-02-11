import { TPatient } from '@/entities/patient';

import { type Prisma, PrismaClient } from '@prisma/client';

export interface IPatientRepositories {
  create(createDTO: Prisma.PatientCreateArgs): Promise<TPatient>;
  findAll(findAllArgs: Prisma.PatientFindManyArgs): Promise<TPatient[]>;
  delete(deleteArgs: Prisma.PatientDeleteArgs): Promise<TPatient | null>;
  update(updateArgs: Prisma.PatientUpdateArgs): Promise<TPatient | null>;
  findUnique(
    findUniqueArgs: Prisma.PatientFindUniqueArgs
  ): Promise<TPatient | null>;
  findFirst(
    findFirstArgs: Prisma.PatientFindFirstArgs
  ): Promise<TPatient | null>;
}

class PatientRepositories implements IPatientRepositories {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(createArgs: Prisma.PatientCreateArgs) {
    return this.prismaService.patient.create(createArgs);
  }

  async findAll(findAllArgs: Prisma.PatientFindManyArgs) {
    return this.prismaService.patient.findMany(findAllArgs);
  }

  async findUnique(findUniqueArgs: Prisma.PatientFindUniqueArgs) {
    return this.prismaService.patient.findUnique(findUniqueArgs);
  }

  async delete(deleteArgs: Prisma.PatientDeleteArgs) {
    return this.prismaService.patient.delete(deleteArgs);
  }

  async update(updateArgs: Prisma.PatientUpdateArgs) {
    return this.prismaService.patient.update(updateArgs);
  }

  async findFirst(findFirstArgs: Prisma.PatientFindFirstArgs) {
    return this.prismaService.patient.findFirst(findFirstArgs);
  }
}

export { PatientRepositories };
