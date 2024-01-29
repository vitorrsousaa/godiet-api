import { InvalidCredentials } from '@/errors';
import { IUserRepositories } from '@/repositories/user';

export interface IMeInput {
  userId: string;
}

export interface IMeOutput {
  name: string;
  email: string;
  id: string;
}

export interface IMeService {
  execute(meInput: IMeInput): Promise<IMeOutput>;
}

export class MeService implements IMeService {
  constructor(private readonly userRepositories: IUserRepositories) {}

  async execute(meInput: IMeInput): Promise<IMeOutput> {
    const { userId } = meInput;

    const findUser = await this.userRepositories.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new InvalidCredentials('User not exists');
    }

    return {
      name: findUser.name,
      email: findUser.email,
      id: findUser.id,
    };
  }
}
