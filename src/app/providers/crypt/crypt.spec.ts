import { ICrypt } from '@/interfaces/providers';

import { CryptProvider } from '.';

describe('Crypt', () => {
  let crypt: ICrypt;

  beforeEach(() => {
    crypt = new CryptProvider();
  });

  it('Should return correctly hash value', async () => {
    // Arrange
    const password = 'password';

    // Act
    const hashedPassword = await crypt.hash(password);

    // Assert
    expect(password).not.toEqual(hashedPassword);
  });

  it('Should compare equal password correctly', async () => {
    // Arrange
    const password = 'any_password';
    const hashedPassword = await crypt.hash(password);

    // Act
    const result = await crypt.compare(password, hashedPassword);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should compare different password correctly', async () => {
    // Arrange
    const password = 'any_password';
    const hashedPassword = await crypt.hash(password);

    // Act
    const result = await crypt.compare(password, `${hashedPassword}a`);

    // Assert
    expect(result).toBeFalsy();
  });
});
