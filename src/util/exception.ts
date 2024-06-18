/**
 * `Exception` class extends the native JavaScript `Error` class to include an additional context property.
 * This context can provide more information about the error, making it easier to handle and debug.
 */
export class Exception extends Error {
  context: Record<string, unknown>;

  /**
   * Creates an instance of the Exception class.
   *
   * @param {string} message - The error message.
   * @param {Record<string, unknown>} context - Additional error context which can include any relevant data that might help in debugging.
   */
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message);
    this.context = context;
    // Ensures that the instance of `Exception` is treated as a subclass of `Error`.
    Object.setPrototypeOf(this, Exception.prototype);
  }

  /**
   * Wraps a function call in a try-catch block and enhances any caught error with additional context.
   * If the function throws an `Exception`, the context from the thrown exception is merged with the given context.
   * If it throws an ordinary error, it is rethrown as an `Exception` with the given context.
   *
   * @template T - The expected return type of the `fn` function.
   * @param {() => Promise<T>} fn - A function that returns a promise. This function is intended to be executed and potentially throw an error.
   * @param {Record<string, unknown>} context - Context to be added or merged in case of an error.
   * @returns {Promise<T>} - The result of the function `fn` if it succeeds.
   * @throws {Exception} - Throws an `Exception` if the function `fn` throws, enhancing the error with additional context.
   */
  static async wrap<T>(fn: () => Promise<T>, context: Record<string, unknown> = {}): Promise<T> | never {
    try {
      return await fn();
    } catch (e) {
      let mergedContext = context;
      if (e instanceof Exception) {
        mergedContext = { ...context, ...e.context };
      }

      let message = "An error occurred";
      if (e instanceof Error) {
        message = e.message;
      }

      throw new Exception(message, mergedContext);
    }
  }
}
