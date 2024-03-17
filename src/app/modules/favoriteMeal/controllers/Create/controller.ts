import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { CreateServiceSchema, ICreateService } from '../../services/Create';

export class CreateController implements IController {
  constructor(private readonly createFavoriteMealService: ICreateService) {}

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
        favoriteMeal: request.body,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.createFavoriteMealService.execute({
        userId: result.data.userId,
        favoriteMeal: result.data.favoriteMeal,
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
