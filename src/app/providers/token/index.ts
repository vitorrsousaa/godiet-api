import { IGenerateToken, IToken, PayloadProps } from '@/interfaces/providers';

import { Config } from '@config';
import jwt from 'jsonwebtoken';

export class TokenProvider implements IToken {
  constructor(private readonly config: Config) {}

  generate(generateToken: IGenerateToken, duration?: number) {
    const { id } = generateToken;
    const time = duration ? duration : this.config.ACCESS_TOKEN_EXPIRATION;

    return jwt.sign({ id: id.toString() }, this.config.AUTH_SECRET, {
      expiresIn: time,
    });
  }

  verify(token: string) {
    const result = jwt.verify(token, this.config.AUTH_SECRET);
    return result as PayloadProps;
  }
}
