import { makeRepositoryObservationTemplate } from '@/factories/repositories/observationTemplate/makeRepositoryObservationTemplate';
import { DeleteService } from '@/modules/observationTemplate/services/Delete';

export function makeServiceDeleteObservationTemplate() {
  return new DeleteService(makeRepositoryObservationTemplate());
}
