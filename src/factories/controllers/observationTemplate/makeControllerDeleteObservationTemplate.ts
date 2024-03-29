import { makeServiceDeleteObservationTemplate } from '@/factories/services/observationTemplate/makeServiceDeleteObservationTemplate';
import { DeleteController } from '@/modules/observationTemplate/controllers/Delete';

export function makeControllerDeleteObservationTemplate() {
  return new DeleteController(makeServiceDeleteObservationTemplate());
}
