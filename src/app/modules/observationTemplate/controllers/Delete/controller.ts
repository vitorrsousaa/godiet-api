import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { DeleteServiceSchema, IDeleteService } from '../../services/Delete';

export class DeleteController implements IController {
  constructor(private readonly deleteService: IDeleteService) {}

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

      const result = returnErrorMissingField(DeleteServiceSchema, {
        userId: request.accountId,
        observationTemplateId: request.params.id,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const output = await this.deleteService.execute({
        userId: result.data.userId,
        observationTemplateId: result.data.observationTemplateId,
      });

      return {
        statusCode: 204,
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
