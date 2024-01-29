import { makeServiceMe } from '@/factories/services/user/makeServiceMe';
import { MeController } from '@/modules/user/controllers/Me';

export function makeControllerMe() {
  return new MeController(makeServiceMe());
}
