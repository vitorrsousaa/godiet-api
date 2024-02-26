import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import {
  FindByPatientIdServiceSchema,
  IFindByPatientIdService,
} from '../../services/FindByPatientId';
import {
  FindByPlanningIdServiceSchema,
  IFindByPlanningIdService,
} from '../../services/FindByPlanningId';

export class FindPlanningController implements IController {
  constructor(
    private readonly findByPatientIdService: IFindByPatientIdService,
    private readonly findByPlanningIdService: IFindByPlanningIdService
  ) {}

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

      if (request.queryParams?.planningId) {
        const result = returnErrorMissingField(FindByPlanningIdServiceSchema, {
          userId: request.accountId,
          patientId: request.patientId,
          planningId: request.queryParams.planningId,
        });

        if (!result.success) {
          return {
            statusCode: result.data.statusCode,
            body: result.data.message,
          };
        }

        const service = await this.findByPlanningIdService.execute({
          patientId: result.data.patientId,
          planningId: result.data.planningId,
          userId: result.data.userId,
        });

        return {
          statusCode: 200,
          body: service,
        };
      }

      const result = returnErrorMissingField(FindByPatientIdServiceSchema, {
        userId: request.accountId,
        patientId: request.patientId,
      });

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.findByPatientIdService.execute(result.data);

      return {
        statusCode: 200,
        body: service,
      };
    } catch (error) {
      console.log(error);
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
