import { InvalidCredentials } from '@/errors';
import { ICrypt, IToken } from '@/interfaces/providers';
import { IUserRepositories } from '@/repositories/user';

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
    private readonly userRepositories: IUserRepositories,
    private readonly cryptProvider: ICrypt,
    private readonly tokenProvider: IToken
  ) {}

  async execute(signinInput: ISigninInput): Promise<ISigninOutput> {
    const { user } = signinInput;
    const { email, password } = user;

    const findUser = await this.userRepositories.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
        name: true,
        id: true,
      },
    });

    if (!findUser) {
      throw new InvalidCredentials();
    }

    const matchPassword = await this.cryptProvider.compare(
      password,
      findUser.password
    );

    if (!matchPassword) {
      throw new InvalidCredentials('User not exists', 403);
    }

    const token = this.tokenProvider.generate({ id: findUser.id });

    return {
      accessToken: token,
    };
  }
}
