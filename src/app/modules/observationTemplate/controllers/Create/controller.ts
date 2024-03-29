import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { CreateServiceSchema, ICreateService } from '../../services/Create';

export class CreateController implements IController {
  constructor(private readonly createService: ICreateService) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      if (!request.accountId) {
        return {
          statusCode: 400,
          body: {
            error: 'User not found',
          },
        };
      }

      const result = returnErrorMissingField(CreateServiceSchema, {
        userId: request.accountId,
        observation: {
          title: request.body.title,
          text: request.body.text,
        },
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const output = await this.createService.execute({
        userId: result.data.userId,
        observation: {
          title: result.data.observation.title,
          text: result.data.observation.text,
        },
      });

      return {
        statusCode: 201,
        body: output,
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
