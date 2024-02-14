import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { FindAllServiceSchema, IFindAllService } from '../../services/FindAll';

export class FindAllController implements IController {
  constructor(private readonly findAllFoodService: IFindAllService) {}
  async handle(request: IRequest): Promise<IResponse> {
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    console.log(request.queryParams);

    const result = returnErrorMissingField(
      FindAllServiceSchema,
      request.queryParams
    );

    if (!result.success) {
      return {
        statusCode: result.data.statusCode,
        body: result.data.message,
      };
    }

    const service = await this.findAllFoodService.execute({
      categoryId: result.data.categoryId,
      portion: result.data.portion as number,
    });

    return {
      statusCode: 200,
      body: service,
    };
  }
}
