import type { Validator } from "../types/validator.js";
import { validate } from "../util/validation.js";

export async function fromObject<$Validator extends Validator>({
  data,
  schema,
}: {
  data: unknown;
  schema: $Validator;
}) {
  return validate(data, schema);
}
