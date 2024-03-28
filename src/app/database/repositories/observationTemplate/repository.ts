/* eslint-disable indent */
import { TObservationTemplate } from '@/entities/observationTemplate';

import { type Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IObservationTemplateRepository {
  create(
    createObservationTemplateDTO: Prisma.ObservationTemplateCreateArgs
  ): Promise<TObservationTemplate>;
  createMany(
    createManyObservationTemplateDTO: Prisma.ObservationTemplateCreateManyArgs
  ): Promise<Prisma.BatchPayload>;
  findMany(
    findManyObservationTemplateArgs: Prisma.ObservationTemplateFindManyArgs
  ): Promise<TObservationTemplate[]>;
  delete(
    deleteObservationTemplateArgs: Prisma.ObservationTemplateDeleteArgs
  ): Promise<TObservationTemplate>;
  update(
    updateObservationTemplateArgs: Prisma.ObservationTemplateUpdateArgs
  ): Promise<TObservationTemplate>;
}

export class ObservationTemplateRepositories
  implements IObservationTemplateRepository
{
  constructor(private readonly prismaService: PrismaClient) {}

  async create(
    createObservationTemplateDTO: Prisma.ObservationTemplateCreateArgs
  ) {
    return this.prismaService.observationTemplate.create(
      createObservationTemplateDTO
    );
  }

  async createMany(
    createManyObservationTemplateDTO: Prisma.ObservationTemplateCreateManyArgs
  ) {
    return this.prismaService.observationTemplate.createMany(
      createManyObservationTemplateDTO
    );
  }

  async findMany(
    findManyObservationTemplateArgs: Prisma.ObservationTemplateFindManyArgs
  ) {
    return this.prismaService.observationTemplate.findMany(
      findManyObservationTemplateArgs
    );
  }

  async delete(
    deleteObservationTemplateArgs: Prisma.ObservationTemplateDeleteArgs
  ) {
    return this.prismaService.observationTemplate.delete(
      deleteObservationTemplateArgs
    );
  }
  async update(
    updateObservationTemplateArgs: Prisma.ObservationTemplateUpdateArgs<DefaultArgs>
  ): Promise<TObservationTemplate> {
    return this.prismaService.observationTemplate.update(
      updateObservationTemplateArgs
    );
  }
}
