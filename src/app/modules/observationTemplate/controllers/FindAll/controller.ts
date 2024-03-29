import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { FindAllServiceSchema, IFindAllService } from '../../services/FindAll';

export class FindAllController implements IController {
  constructor(private readonly findAllService: IFindAllService) {}

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

      const result = returnErrorMissingField(FindAllServiceSchema, {
        userId: request.accountId,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const output = await this.findAllService.execute({
        userId: result.data.userId,
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
