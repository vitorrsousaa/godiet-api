import { AppError } from '@/errors';

export class PlanningNotFound extends AppError {
  constructor() {
    super('Planning not found', 404);
  }

  name = 'PlanningNotFound';
}
