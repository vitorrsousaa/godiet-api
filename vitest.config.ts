import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/src/app/tests/**/index.ts',
      '**/html/**',
      '**/coverage/**',
      '**/src/server/**',
      '**/src/factories/**',
      '**/docs/**',
      '**/.serverless/**',
      '**/esbuild/**',
      '**/.scaffolding/**',
      '**/prisma/**',
    ],
    reporters: 'html',
    coverage: {
      provider: 'v8',
    },
    globals: true,
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
    },
  },
});
