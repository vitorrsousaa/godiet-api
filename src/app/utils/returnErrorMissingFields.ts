import * as z from "zod";

import { ZodError } from "@/errors";

// z.SafeParseSuccess<z.output<S>>["data"]

interface IReturnErrorMissingFieldOutput<S extends z.ZodType> {
  success: true;
  data: S extends z.ZodType<infer T> ? z.SafeParseSuccess<T>["data"] : never;
}

interface IReturnErrorMissingFieldOutputFalse {
  success: false;
  data: ZodError;
}

type IReturnErrorMissingFieldOutputUnion<S extends z.ZodType> =
  | IReturnErrorMissingFieldOutput<S>
  | IReturnErrorMissingFieldOutputFalse;

export function returnErrorMissingField<S extends z.ZodType>(
  schema: S,
  request: unknown
): IReturnErrorMissingFieldOutputUnion<S> {
  const result = schema.safeParse(request);

  if (!result.success) {
    const error = new ZodError(result.error);

    return {
      success: false,
      data: error,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
