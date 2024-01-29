import { AuthenticationMiddleware } from '@/middlewares/authentication';

import { makeProviderToken } from '../providers/makeProviderToken';

export function makeMiddlewareAuthentication() {
  return new AuthenticationMiddleware(makeProviderToken());
}
