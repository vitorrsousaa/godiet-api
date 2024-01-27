import { ICrypt } from '@/interfaces/providers';

import bcrypt from 'bcryptjs';

export class CryptProvider implements ICrypt {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
