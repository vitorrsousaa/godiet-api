// InvalidCredentials.test.js

import { AppError } from '../appError';
import { InvalidCredentials } from '../invalidCredentials';

describe('InvalidCredentials', () => {
  it('Should be a instance of AppError', () => {
    const invalidCredentials = new InvalidCredentials();

    expect(invalidCredentials).toBeInstanceOf(AppError);
  });

  it('Should be a correct name', () => {
    const invalidCredentials = new InvalidCredentials();

    expect(invalidCredentials.name).toEqual('InvalidCredentials');
  });

  it('Should return a default message and code when the user not pass message and code', () => {
    const invalidCredentials = new InvalidCredentials();

    expect(invalidCredentials.message).toEqual('Invalid credentials');

    expect(invalidCredentials.statusCode).toEqual(401);
  });

  it('Should allow custom message', () => {
    const customMessage = 'Credenciais inválidas. Por favor, tente novamente.';

    const invalidCredentials = new InvalidCredentials(customMessage);

    expect(invalidCredentials.message).toEqual(customMessage);
  });

  it('Should allow custom message and custom code', () => {
    const customMessage = 'Credenciais inválidas. Por favor, tente novamente.';

    const customCode = 403;

    const invalidCredentials = new InvalidCredentials(
      customMessage,
      customCode
    );

    expect(invalidCredentials.message).toEqual(customMessage);

    expect(invalidCredentials.statusCode).toEqual(customCode);
  });
});
