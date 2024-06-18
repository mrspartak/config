// KUDOS to trpc for the inspiration

import type { Validator, inferValidator } from "../types/validator.js";

export type ValidatorFn<T> = (value: unknown) => Promise<T> | T;

/**
 * Get the validation function depending on the parser type
 */
export function getValidator<T>(givenValidator: Validator): ValidatorFn<T> {
  const v = givenValidator as any;

  if (typeof v === "function") {
    return v;
  }

  if (typeof v.parseAsync === "function") {
    return v.parseAsync.bind(v);
  }

  if (typeof v.parse === "function") {
    return v.parse.bind(v);
  }

  if (typeof v.validateSync === "function") {
    return v.validateSync.bind(v);
  }

  if (typeof v.create === "function") {
    return v.create.bind(v);
  }

  throw new Error(
    "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
  );
}

/**
 * Validate the input against the schema
 * This function will infer the output type from the validator
 * @param input The input to validate
 * @param schema The schema to validate against (must be a validator definition)
 */
export function validate<$Validator extends Validator>(
  input: unknown,
  schema: $Validator,
): inferValidator<$Validator>["out"] {
  const v = getValidator(schema);
  return v(input);
}
