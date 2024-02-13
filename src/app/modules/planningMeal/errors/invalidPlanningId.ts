import { AppError } from '@/errors';

export class InvalidPlanningId extends AppError {
  constructor() {
    super('Invalid Planning id', 401);
  }

  name = 'InvalidPlanningId';
}
