import { TokenProvider } from '@/providers/token';

import { Config } from '@config';

export function makeProviderToken() {
  return new TokenProvider(new Config());
}
