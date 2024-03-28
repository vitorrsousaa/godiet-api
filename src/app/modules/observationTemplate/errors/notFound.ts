import { AppError } from '@/errors';

export class ObservationTemplateNotFound extends AppError {
  constructor() {
    super('Observation template not Found', 404);
  }

  name = 'ObservationTemplateNotFound';
}
