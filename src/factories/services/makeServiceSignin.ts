import { SigninService } from '@/modules/auth/services';

import { makeProviderCrypt } from '../providers/makeProviderCrypt';
import { makeProviderToken } from '../providers/makeProviderToken';
import { makeRepositoryUser } from '../repositories/makeRepositoryUser';

export function makeServiceSignIn() {
  return new SigninService(
    makeRepositoryUser(),
    makeProviderCrypt(),
    makeProviderToken()
  );
}
