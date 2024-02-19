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
        anamnesis: {
          title: request.body.title,
          text: request.body.text,
          id: request.body.id,
        },
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.updateService.execute({
        userId: result.data.userId,
        patientId: result.data.patientId,
        anamnesis: result.data.anamnesis,
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
