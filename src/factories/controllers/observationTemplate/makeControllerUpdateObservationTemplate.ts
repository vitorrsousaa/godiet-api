import { makeServiceUpdateObservationTemplate } from '@/factories/services/observationTemplate/makeServiceUpdateObservationTemplate';
import { UpdateController } from '@/modules/observationTemplate/controllers/Update';

export function makeControllerUpdateObservationTemplate() {
  return new UpdateController(makeServiceUpdateObservationTemplate());
}
