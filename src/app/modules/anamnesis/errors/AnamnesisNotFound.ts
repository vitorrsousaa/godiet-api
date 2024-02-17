import { AppError } from '@/errors';

export class AnamnesisNotFound extends AppError {
  constructor() {
    super('Anamnesis not Found', 404);
  }

  name = 'AnamnesisNotFound';
}
