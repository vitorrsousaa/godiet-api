import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';

import { returnErrorMissingField } from 'src/app/utils';

import { ISigninService, SigninServiceSchema } from '../../services/Signin';

export class SigninController implements IController {
  constructor(private readonly signinService: ISigninService) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const body = returnErrorMissingField(SigninServiceSchema, request.body);

      if (!body.success) {
        return {
          statusCode: body.data.statusCode,
          body: body.data.message,
        };
      }

      const result = await this.signinService.execute({
        user: {
          email: body.data.email,
          password: body.data.password,
        },
      });

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      if (error instanceof AppError) {
        return {
          statusCode: error.statusCode,
          body: {
            error: error.message,
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      };
    }
  }
}
