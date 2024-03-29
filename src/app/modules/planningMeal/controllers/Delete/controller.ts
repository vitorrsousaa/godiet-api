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

      if (!request.patientId) {
        return {
          statusCode: 400,
          body: {
            error: 'Patient not found',
          },
        };
      }

      if (!request.queryParams.planningMealId) {
        return {
          statusCode: 400,
          body: {
            error: 'Planning meal id is required',
          },
        };
      }

      const result = returnErrorMissingField(DeleteServiceSchema, {
        userId: request.accountId,
        patientId: request.patientId,
        planningMealId: request.queryParams.planningMealId,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      await this.deleteService.execute({
        patientId: result.data.patientId,
        planningMealId: result.data.planningMealId,
        userId: result.data.userId,
      });

      return {
        statusCode: 204,
        body: null,
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
