import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import { readFile } from "../util/readFile.js";
import type { ValibotSchemas, v } from "../util/validation.js";
import { fromObject } from "./objectFactory.js";

export async function fromJSONFile<T extends ValibotSchemas>({
  path,
  schema,
}: {
  path: string | string[];
  schema: T;
}): Promise<v.InferOutput<T>> {
  const paths = Array.isArray(path) ? path : [path];

  /**
   * Read all files in parallel and parse them as JSON
   */
  const promises = [];
  for (const path of paths) {
    promises.push(
      Exception.wrap(
        async () => {
          const fileContents = await readFile(path);
          return JSON.parse(fileContents);
        },
        {
          path,
        },
      ),
    );
  }
  const parsed = await Promise.all(promises);

  /**
   * Merge all parsed JSON objects into a single object
   */
  const merged = deepMerge({} as T, ...parsed);

  return fromObject({
    data: merged,
    schema,
  });
}
