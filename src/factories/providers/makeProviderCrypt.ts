import { CryptProvider } from '@/providers/crypt';

export function makeProviderCrypt() {
  return new CryptProvider();
}
