import { AppError } from '@/errors';

export class InvalidFavoriteMeal extends AppError {
  constructor() {
    super('Favorite meal not Found', 404);
  }

  name = 'InvalidFavoriteMeal';
}
