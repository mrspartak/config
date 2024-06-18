import type { Validator } from "../types/validator.js";
import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import { fromObject } from "./objectFactory.js";

export async function fromURL<$Validator extends Validator>({
  url,
  schema,
}: {
  url: string | string[];
  schema: $Validator;
}) {
  const urls = Array.isArray(url) ? url : [url];

  /**
   * Fetch all URLs in parallel and parse them as JSON
   */
  const promises = [];
  for (const url of urls) {
    promises.push(
      Exception.wrap(
        async () => {
          const response = await fetch(url, {
            headers: {
              Accept: "application/json",
            },
            method: "GET",
          });
          return response.json() as Promise<Record<string, unknown>>;
        },
        {
          url,
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
