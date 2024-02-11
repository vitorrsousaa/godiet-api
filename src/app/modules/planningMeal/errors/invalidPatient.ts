import { AppError } from '@/errors';

export class InvalidPatient extends AppError {
  constructor() {
    super('Invalid Patient', 401);
  }

  name = 'InvalidPatient';
}
