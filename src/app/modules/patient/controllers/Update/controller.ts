import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import { IUpdatePatientDTO } from '../../dtos/update-patient-dto';
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
        patient: request.body,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.updateService.execute({
        patient: result.data.patient as IUpdatePatientDTO,
        patientId: result.data.patientId,
        userId: result.data.userId,
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
