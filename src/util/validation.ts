// KUDOS to trpc for the inspiration

import type { Validator, inferValidator } from "../types/validator.js";

export type ValidatorFn<T> = (value: unknown) => Promise<T> | T;

/**
 * Retrieves the appropriate validation function based on the type of validator provided.
 * This function dynamically determines the appropriate validation method from the validator object,
 * supporting synchronous, asynchronous, and factory-based validation strategies.
 *
 * @template T - The expected output type after validation.
 * @param {Validator} givenValidator - The validator object that might include different validation methods.
 * @returns {ValidatorFn<T>} - A function capable of validating an input according to the validator's rules.
 * @throws {Error} If no suitable validation function is found in the givenValidator object.
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
 * Validates the input against the specified schema using the appropriate validator function.
 * The function will infer the output type from the validator, ensuring that the input conforms
 * to the expected schema, and providing the correctly typed result.
 *
 * @template $Validator - The validator type that extends the base Validator interface, specifying the input and output types.
 * @param {unknown} input - The input data to validate.
 * @param {$Validator} schema - The schema against which to validate the input. Must conform to the Validator interface.
 * @returns {inferValidator<$Validator>["out"]} - The validated data with the type inferred from the validator.
 */
export function validate<$Validator extends Validator>(
  input: unknown,
  schema: $Validator,
): inferValidator<$Validator>["out"] {
  const v = getValidator<$Validator>(schema);
  return v(input);
}
