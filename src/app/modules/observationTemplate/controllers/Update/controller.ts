import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { IUpdateService, UpdateServiceSchema } from '../../services/Update';

export class UpdateController implements IController {
  constructor(private readonly updateService: IUpdateService) {}

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

      const result = returnErrorMissingField(UpdateServiceSchema, {
        userId: request.accountId,
        observation: {
          title: request.body.title,
          text: request.body.text,
          id: request.body.id,
        },
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,

          body: result.data.message,
        };
      }

      const output = await this.updateService.execute({
        userId: result.data.userId,
        observation: result.data.observation,
      });

      return {
        statusCode: 200,
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
