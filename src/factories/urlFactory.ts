import type { Validator } from "../types/validator.js";
import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import { fromObject } from "./objectFactory.js";

/**
 * Asynchronously fetches and validates data from one or more URLs against a provided schema.
 *
 * This function is designed to handle fetching JSON data from specified URLs, which can either be
 * a single URL or an array of URLs. It fetches all URLs in parallel, parses the JSON, merges the results
 * into a single object, and then validates the merged object against the provided schema. The function
 * leverages exception handling to manage errors during the fetch process.
 *
 * @template Validator - The validator type that extends the base Validator interface.
 * @param {Object} params - The parameters object.
 * @param {string|string[]} params.url - One or more URLs from which to fetch data.
 * @param {Validator} params.schema - The schema against which the merged data will be validated.
 * @returns {Promise<ReturnType<typeof fromObject>>} A promise that resolves with the result of the validation.
 * @throws {Exception} - Captures and rethrows exceptions with context if the fetch or parsing fails.
 *
 * @includeExample examples/urlFactory.ts
 */
export async function fromURL<$Validator extends Validator>({
  // Parameter destructuring for clarity in documentation
  url,
  schema,
}: {
  url: string | string[];
  schema: $Validator;
}) {
  // Determine if url is an array or a single string and normalize to an array
  const urls = Array.isArray(url) ? url : [url];

  // Fetch all URLs in parallel and parse them as JSON
  const promises = urls.map((url) =>
    Exception.wrap(
      async () => {
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
          method: "GET",
        });
        return response.json() as Promise<Record<string, unknown>>;
      },
      { url },
    ),
  );

  // Await all fetch promises and then merge results
  const parsed = await Promise.all(promises);

  // Deep merge all parsed JSON objects into a single object
  const merged = deepMerge({} as Record<string, unknown>, ...parsed);

  // Validate the merged JSON object against the provided schema
  return fromObject({ data: merged, schema });
}
