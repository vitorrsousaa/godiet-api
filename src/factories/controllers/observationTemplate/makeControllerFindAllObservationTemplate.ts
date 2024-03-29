import { makeServiceFindAllObservationTemplate } from '@/factories/services/observationTemplate/makeServiceFindAllObservationTemplate';
import { FindAllController } from '@/modules/observationTemplate/controllers/FindAll';

export function makeControllerFindAllObservationTemplate() {
  return new FindAllController(makeServiceFindAllObservationTemplate());
}
