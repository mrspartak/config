import { Exception } from "../util/exception.js";
import { deepMerge } from "../util/mergeObjects.js";
import type { ValibotSchemas, v } from "../util/validation.js";
import { fromObject } from "./objectFactory.js";

export async function fromURL<T extends ValibotSchemas>({
  url,
  schema,
}: {
  url: string | string[];
  schema: T;
}): Promise<v.InferOutput<T>> {
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
