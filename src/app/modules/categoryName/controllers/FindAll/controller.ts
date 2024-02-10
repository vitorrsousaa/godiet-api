import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';

import { IFindAllService } from '../../services/FindAll/service';

export class FindAllController implements IController {
  constructor(private readonly findAllCategoryNameService: IFindAllService) {}

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

      const categories = await this.findAllCategoryNameService.execute();

      return {
        statusCode: 200,
        body: categories,
      };
    } catch {
      return {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      };
    }
  }
}
