export class Exception extends Error {
  context: Record<string, unknown>;

  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message);
    this.context = context;

    Object.setPrototypeOf(this, Exception.prototype);
  }

  static async wrap<T>(fn: () => Promise<T>, context: Record<string, unknown> = {}): Promise<T> {
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
