import { AppError } from '@/errors';
import { IController, IRequest, IResponse } from '@/interfaces/controller';
import { returnErrorMissingField } from '@/utils';

import { ISignupService, SignupServiceSchema } from '../../services';

export class SignupController implements IController {
  constructor(private readonly signupService: ISignupService) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const body = returnErrorMissingField(SignupServiceSchema, request.body);

      if (!body.success) {
        return {
          statusCode: body.data.statusCode,
          body: body.data.message,
        };
      }

      const service = await this.signupService.execute({
        user: {
          email: 'request.body.email@email.com',
          name: 'request.body.name',
          password: 'request.body.password',
        },
      });

      return {
        statusCode: 200,
        body: service,
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
