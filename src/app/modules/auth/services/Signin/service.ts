import { ICrypt, IToken } from '@/interfaces/providers';

import * as z from 'zod';

export const SigninServiceSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  password: z.string().min(8),
});

export type TUser = z.infer<typeof SigninServiceSchema>;

export interface ISigninInput {
  user: TUser;
}

export interface ISigninOutput {
  accessToken: string;
}

export interface ISigninService {
  execute(signinInput: ISigninInput): Promise<ISigninOutput>;
}

export class SigninService implements ISigninService {
  constructor(
    private readonly cryptProvider: ICrypt,
    private readonly tokenProvider: IToken
  ) {}

  async execute(signinInput: ISigninInput): Promise<ISigninOutput> {
    const { user } = signinInput;

    return {
      accessToken: user.email,
    };
  }
}
