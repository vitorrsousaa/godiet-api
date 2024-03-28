import { makeServiceCreateObservationTemplate } from '@/factories/services/observationTemplate/makeServiceCreateObservationTemplate';
import { CreateController } from '@/modules/observationTemplate/controllers/Create';

export function makeControllerCreateObservationTemplate() {
  return new CreateController(makeServiceCreateObservationTemplate());
}
