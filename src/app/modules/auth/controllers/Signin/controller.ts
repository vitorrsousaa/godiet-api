import { IController, IRequest, IResponse } from '@/interfaces/controller';

import { returnErrorMissingField } from 'src/app/utils';

import { ISigninService, SigninServiceSchema } from '../../services/Signin';

export class SigninController implements IController {
  constructor(private readonly signinService: ISigninService) {}
  async handle(request: IRequest): Promise<IResponse> {
    const body = returnErrorMissingField(SigninServiceSchema, request.body);

    if (!body.success) {
      return {
        statusCode: body.data.statusCode,
        body: body.data.message,
      };
    }

    const result = await this.signinService.execute({
      user: body.data,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
