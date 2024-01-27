import { Config } from '@/config';
import { TokenProvider } from '@/providers/token';

export function makeProviderToken() {
  return new TokenProvider(new Config());
}
