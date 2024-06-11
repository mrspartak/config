import { type ValibotSchemas, type v, validate } from "../util/validation.js";

export async function fromObject<T extends ValibotSchemas>({
  data,
  schema,
}: {
  data: Record<string, unknown>;
  schema: T;
}): Promise<v.InferOutput<T>> {
  return validate(data, schema);
}
