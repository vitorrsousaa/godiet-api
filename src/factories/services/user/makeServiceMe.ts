import { makeRepositoryUser } from '@/factories/repositories/makeRepositoryUser';
import { MeService } from '@/modules/user/services/Me';

export function makeServiceMe() {
  return new MeService(makeRepositoryUser());
}
