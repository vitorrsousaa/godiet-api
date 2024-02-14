import { AppError } from '@/errors';
import { IController } from '@/interfaces/controller';
import { IRequest, IResponse } from '@/interfaces/http';
import { returnErrorMissingField } from '@/utils';

import {
  CreatePatientServiceSchema,
  ICreateService,
} from '../../services/Create';

export class CreateController implements IController {
  constructor(private readonly createPatientService: ICreateService) {}
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

      const result = returnErrorMissingField(
        CreatePatientServiceSchema,
        request.body
      );

      if (!result.success) {
        return {
          statusCode: result.data.statusCode,
          body: result.data.message,
        };
      }

      const service = await this.createPatientService.execute({
        userId: request.accountId,
        patient: {
          email: result.data.email,
          name: result.data.name,
          birthDate: result.data.birthDate,
          gender: result.data.gender,
          height: result.data.height,
          weight: result.data.weight,
        },
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
