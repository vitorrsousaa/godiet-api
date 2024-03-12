import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { CreateServiceSchema, ICreateService } from '../../services/Create';

export class CreateController implements IController {
  constructor(private readonly createPlanningMealService: ICreateService) {}
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

      const result = returnErrorMissingField(CreateServiceSchema, {
        userId: request.accountId,
        patientId: request.patientId,
        planningMeal: request.body,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.createPlanningMealService.execute({
        patientId: result.data.patientId,
        userId: result.data.userId,
        planningMeal: result.data.planningMeal,
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

      console.log(error);

      return {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      };
    }
  }
}
