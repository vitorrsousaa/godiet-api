import { AppError } from './appError';

export class InvalidCredentials extends AppError {
  constructor(message?: string, code?: number) {
    super(message || 'Invalid credentials', code || 401);
  }
  name = 'InvalidCredentials';
}
