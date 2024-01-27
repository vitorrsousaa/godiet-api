import dotenv from 'dotenv';
import * as z from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});

// Carregando variáveis de ambiente
dotenv.config();

// Validando as variáveis de ambiente
try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Erro nas variáveis de ambiente:', error.errors);
    process.exit(1);
  }
}

export class Config {
  public PORT = process.env.PORT || '3001';
  public AUTH_SECRET = process.env.AUTH_SECRET as string;
  public ACCESS_TOKEN_EXPIRATION = 60 * 60 * 60 * 60; // 15min
}
