import type { Validator } from "../types/validator.js";
import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import { readFile } from "../util/readFile.js";
import { fromObject } from "./objectFactory.js";

export async function fromJSONFile<$Validator extends Validator>({
  path,
  schema,
}: {
  path: string | string[];
  schema: $Validator;
}) {
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
  const merged = deepMerge({} as Record<string, unknown>, ...parsed);

  return fromObject({
    data: merged,
    schema,
  });
}
