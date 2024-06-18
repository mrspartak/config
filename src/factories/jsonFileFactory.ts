import type { Validator } from "../types/validator.js";
import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import { readFile } from "../util/readFile.js";
import { fromObject } from "./objectFactory.js";

/**
 * Asynchronously reads and validates JSON data from one or more files against a provided schema.
 *
 * This function allows for the loading of configuration or data from JSON files specified by path or paths.
 * It handles reading multiple files in parallel, parses them as JSON, and then merges all objects into a single
 * object to be validated against a given schema. Exception handling is integrated to manage and report errors
 * effectively during file reading and parsing stages.
 *
 * @template Validator - The validator type that extends the base Validator interface, defining how data is validated.
 * @param {Object} params - The parameters object containing the path(s) and schema.
 * @param {string|string[]} params.path - Path or array of paths to JSON files that need to be read.
 * @param {Validator} params.schema - The schema against which the data is validated after merging.
 * @returns {Promise<ReturnType<typeof fromObject>>} A promise that resolves with the validated data object.
 * @throws {Exception} - Throws an enhanced exception with contextual information if file reading or parsing fails.
 *
 * @includeExample examples/jsonFileFactory.ts
 */
export async function fromJSONFile<$Validator extends Validator>({
  path,
  schema,
}: {
  path: string | string[];
  schema: $Validator;
}) {
  const paths = Array.isArray(path) ? path : [path];

  // Read and parse all specified JSON files in parallel
  const promises = paths.map((path) =>
    Exception.wrap(
      async () => {
        const fileContents = await readFile(path);
        return JSON.parse(fileContents);
      },
      { path },
    ),
  );

  // Await all read and parse operations
  const parsed = await Promise.all(promises);

  // Merge all parsed JSON objects into a single object
  const merged = deepMerge({} as Record<string, unknown>, ...parsed);

  // Validate the merged JSON object against the provided schema
  return fromObject({ data: merged, schema });
}
