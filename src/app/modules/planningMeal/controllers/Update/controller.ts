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

      if (!request.patientId) {
        return {
          statusCode: 400,
          body: {
            error: 'Patient not found',
          },
        };
      }

      const result = returnErrorMissingField(UpdateServiceSchema, {
        userId: request.accountId,
        patientId: request.patientId,
        planningMealId: request.body.id,
        planningMeal: request.body.planningMeal,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const output = await this.updateService.execute({
        userId: result.data.userId,
        patientId: result.data.patientId,
        planningMealId: result.data.planningMealId,
        planningMeal: result.data.planningMeal,
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
