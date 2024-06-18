type UnknownObject = Record<string, unknown>;

/**
 * Checks if a given item is an object, excluding arrays.
 *
 * @param {unknown} item - The item to check.
 * @returns {boolean} True if the item is an object and not an array, false otherwise.
 */
function isObject(item: unknown): boolean {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deeply merges multiple objects into the target object. Arrays are not merged but replaced during the merge.
 * This function is recursive and will handle nested structures unless cyclical references are present.
 *
 * @param {UnknownObject} target - The initial object to merge into.
 * @param {...Array<UnknownObject>} sources - One or more objects to merge into the target.
 * @returns {UnknownObject} The merged object which is the modified target object.
 */
export function deepMerge(target: UnknownObject, ...sources: Array<UnknownObject>): UnknownObject {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        if (isObject(sourceValue) && isObject(target[key])) {
          // Recursively merge the current property if it is an object in both source and target
          target[key] = deepMerge(target[key] as UnknownObject, sourceValue as UnknownObject);
        } else {
          // Directly set the property if it is not an object or only present in source
          (target as any)[key] = sourceValue;
        }
      }
    }
  }
  // Continue merging the next source into the now modified target
  return deepMerge(target, ...sources);
}
