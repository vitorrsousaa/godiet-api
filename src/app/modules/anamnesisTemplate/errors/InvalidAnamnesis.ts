import { AppError } from '@/errors';

export class InvalidAnamnesis extends AppError {
  constructor() {
    super('Anamnesis not Found', 404);
  }

  name = 'InvalidAnamnesis';
}
