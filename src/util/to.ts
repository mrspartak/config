export async function to<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    if (err instanceof Error) return [err, null];
    throw err;
  }
}
