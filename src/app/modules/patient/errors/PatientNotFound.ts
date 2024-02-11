import { AppError } from '@/errors';

export class PatientNotFound extends AppError {
  constructor() {
    super('Patient not Found', 404);
  }

  name = 'PatientNotFound';
}
