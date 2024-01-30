import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';

import { IFindAllService } from '../../services/FindAll';

export class FindAllController implements IController {
  constructor(private readonly findAllPatientsService: IFindAllService) {}
  async handle(request: IRequest): Promise<IResponse> {
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    const result = await this.findAllPatientsService.execute({
      userId: request.accountId,
    });

    return {
      statusCode: 200,
      body: result,
    };
  }
}
