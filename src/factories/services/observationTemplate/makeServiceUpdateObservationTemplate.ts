import { makeRepositoryObservationTemplate } from '@/factories/repositories/observationTemplate/makeRepositoryObservationTemplate';
import { UpdateService } from '@/modules/observationTemplate/services/Update';

export function makeServiceUpdateObservationTemplate() {
  return new UpdateService(makeRepositoryObservationTemplate());
}
