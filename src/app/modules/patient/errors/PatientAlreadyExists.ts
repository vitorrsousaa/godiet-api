import { AppError } from '@/errors';

export class PatientAlreadyExists extends AppError {
  constructor() {
    super('Patient Already Exists', 422);
  }

  name = 'PatientAlreadyExists';
}
