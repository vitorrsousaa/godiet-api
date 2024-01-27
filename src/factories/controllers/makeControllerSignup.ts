import { SignupController } from '@/modules/auth/controllers';

import { makeServiceSignup } from '../services/makeServiceSignup';

export function makeControllerSignup() {
  return new SignupController(makeServiceSignup());
}
