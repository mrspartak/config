import type { Validator } from "../types/validator.js";
import { validate } from "../util/validation.js";

/**
 * Asynchronously validates a data object against a provided schema.
 *
 * This function serves as a high-level utility for ensuring that data conforms
 * to a specified schema using the validator defined in the schema's structure.
 * It is useful for runtime validation where the schema and data are dynamically
 * provided.
 *
 * @template Validator - The validator type that extends the base Validator interface.
 * @param {Object} params - The parameters object.
 * @param {unknown} params.data - The data object to validate.
 * @param {Validator} params.schema - The validator schema against which to validate the data.
 * @returns {Promise<ReturnType<Validator['validate']>>} A promise that resolves with the validated data.
 * @throws {Error} Throws an error if validation fails.
 *
 * @includeExample examples/objectFactory.ts
 */
export async function fromObject<$Validator extends Validator>({
  data,
  schema,
}: {
  data: unknown;
  schema: $Validator;
}) {
  return validate(data, schema);
}
