import type { Parser } from "../types/parser.js";
import { validate } from "../util/validation.js";

export async function fromObject<$Parser extends Parser>({
  data,
  schema,
}: {
  data: unknown;
  schema: $Parser;
}) {
  return validate(data, schema);
}
