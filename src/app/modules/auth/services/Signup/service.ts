import { ITemplates } from '@/constants/templateAnamnesis';
import { InvalidCredentials } from '@/errors';
import { ICrypt, IToken } from '@/interfaces/providers';
import { IUserRepositories } from '@/repositories/user';

import * as z from 'zod';

export const SignupServiceSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid e-mail format' }),
  password: z.string().min(8),
  phone: z.string().min(8),
});

export type TCreateUserDTO = z.infer<typeof SignupServiceSchema>;

export interface ISignupInput {
  user: TCreateUserDTO;
}

export interface ISignupOutput {
  accessToken: string;
}

export interface ISignupService {
  execute(signupInput: ISignupInput): Promise<ISignupOutput>;
}

export class SignupService implements ISignupService {
  constructor(
    private userRepositories: IUserRepositories,
    private readonly cryptProvider: ICrypt,
    private readonly tokenProvider: IToken,
    private readonly templateAnamnesis: ITemplates[],
    private readonly observationTemplate: ITemplates[]
  ) {}

  async execute(signupInput: ISignupInput): Promise<ISignupOutput> {
    const { user } = signupInput;
    const { email, name, password, phone } = user;

    const findUser = await this.userRepositories.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (findUser) {
      throw new InvalidCredentials('E-mail is already in use', 409);
    }

    const hashedPassword = await this.cryptProvider.hash(password);

    const newUser = await this.userRepositories.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
        anamnesisTemplate: {
          createMany: {
            data: this.templateAnamnesis,
          },
        },
        observationTemplate: {
          createMany: {
            data: this.observationTemplate,
          },
        },
      },
    });

    const token = this.tokenProvider.generate({ id: newUser.id });

    return {
      accessToken: token,
    };
  }
}
