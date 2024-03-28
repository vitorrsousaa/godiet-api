import { makeRepositoryObservationTemplate } from '@/factories/repositories/observationTemplate/makeRepositoryObservationTemplate';
import { CreateService } from '@/modules/observationTemplate/services/Create';

export function makeServiceCreateObservationTemplate() {
  return new CreateService(makeRepositoryObservationTemplate());
}
