import { templates as observationTemplate } from '@/constants/observationTemplate';
import { templates } from '@/constants/templateAnamnesis';
import { SignupService } from '@/modules/auth/services';

import { makeProviderCrypt } from '../providers/makeProviderCrypt';
import { makeProviderToken } from '../providers/makeProviderToken';
import { makeRepositoryUser } from '../repositories/makeRepositoryUser';

export function makeServiceSignup() {
  return new SignupService(
    makeRepositoryUser(),
    makeProviderCrypt(),
    makeProviderToken(),
    templates,
    observationTemplate
  );
}
