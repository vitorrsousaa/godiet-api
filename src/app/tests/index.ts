/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockInstance } from '@vitest/spy';
import { vi } from 'vitest';

type SpyInstance<T extends (...args: any) => any> = MockInstance<
  any,
  ReturnType<T>
>;

const customClearAllMocks = vi.clearAllMocks;
const mock = vi.mock;

export { customClearAllMocks as clearAllMocks, mock };

export * from '@vitest/spy';
export { type SpyInstance };
