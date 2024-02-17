// vitest.config.integration.ts
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', '!src/tests'],
    setupFiles: ['src/tests/helpers/setup.ts'],
  },

  resolve: {
    alias: {
      '@/modules': path.resolve(__dirname, './src/app/modules'),
      '@/interfaces': path.resolve(__dirname, './src/app/interfaces'),
      '@/adapters': path.resolve(__dirname, './src/adapters'),
      '@/factories': path.resolve(__dirname, './src/factories'),
      '@/utils': path.resolve(__dirname, './src/app/utils/index.ts'),
      '@/errors': path.resolve(__dirname, './src/app/errors/index.ts'),
      '@/providers': path.resolve(__dirname, './src/app/providers'),
      '@/config': path.resolve(__dirname, './src/app/config/index.ts'),
      '@/tests': path.resolve(__dirname, './src/app/tests/index.ts'),
      '@/entities': path.resolve(__dirname, './src/app/entities'),
      '@/middlewares': path.resolve(__dirname, './src/app/middlewares'),
      '@/repositories': path.resolve(
        __dirname,
        'src',
        'app',
        'database',
        'repositories'
      ),
      '@/database': path.resolve(__dirname, 'src', 'app', 'database'),
      '@/constants': path.resolve(__dirname, 'src', 'app', 'constants'),
    },
  },
});
