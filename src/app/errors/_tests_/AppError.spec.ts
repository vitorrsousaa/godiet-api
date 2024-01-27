import { AppError } from '../appError';

describe('AppError', () => {
  it('should create an instance of AppError with the provided message', () => {
    const errorMessage = 'This is an error message.';
    const statusCode = 400;
    const error = new AppError(errorMessage, statusCode);

    expect(error.message).toEqual(errorMessage);
    expect(error.statusCode).toEqual(statusCode);
  });

  it('should create an instance of AppError with the default status code (400) if not provided', () => {
    const errorMessage = 'This is another error message.';
    const error = new AppError(errorMessage);

    expect(error.statusCode).toEqual(400);
  });
});
