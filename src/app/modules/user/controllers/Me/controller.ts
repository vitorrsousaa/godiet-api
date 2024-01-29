import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';

import { IMeService } from '../../services/Me';

export class MeController implements IController {
  constructor(private readonly meService: IMeService) {}
  async handle(request: IRequest): Promise<IResponse> {
    if (!request.accountId) {
      return {
        statusCode: 400,
        body: {
          error: 'User not found',
        },
      };
    }

    const recover = await this.meService.execute({
      userId: request.accountId,
    });

    return {
      statusCode: 200,
      body: recover,
    };
  }
}
