import { prisma } from '@/database';
import { ObservationTemplateRepositories } from '@/repositories/observationTemplate';

export function makeRepositoryObservationTemplate() {
  return new ObservationTemplateRepositories(prisma);
}
