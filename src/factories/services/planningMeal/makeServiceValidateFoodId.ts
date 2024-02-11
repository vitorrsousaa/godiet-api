import { makeRepositoryFood } from '@/factories/repositories/food/makeRepositoryFood';
import { ValidateFoodIdService } from '@/modules/planningMeal/services/ValidateFoodId';

export function makeServiceValidateFoodId() {
  return new ValidateFoodIdService(makeRepositoryFood());
}
