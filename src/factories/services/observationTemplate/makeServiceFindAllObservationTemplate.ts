import { makeRepositoryObservationTemplate } from '@/factories/repositories/observationTemplate/makeRepositoryObservationTemplate';
import { FindAllService } from '@/modules/observationTemplate/services/FindAll';

export function makeServiceFindAllObservationTemplate() {
  return new FindAllService(makeRepositoryObservationTemplate());
}
