import * as v from "valibot";
import { ValibotSchemas } from "../types/valibot.js";

export async function validate<T extends ValibotSchemas>(data: T, schema: ValibotSchemas): Promise<v.InferOutput<T>> {
  return v.parseAsync(data, schema);
}

export { v, ValibotSchemas };
