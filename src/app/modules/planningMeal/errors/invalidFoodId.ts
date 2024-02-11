import { AppError } from '@/errors';

export class InvalidFoodId extends AppError {
  constructor() {
    super('Invalid food id', 404);
  }
  name = 'InvalidFoodId';
}
