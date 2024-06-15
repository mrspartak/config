import { describe, expect, it } from "vitest";
import { Exception } from "../../../src/util/exception";

describe("fromJSONFile", () => {
  it("must be a function", () => {
    expect(typeof Exception).toBe("function");
  });

  it("must be a class", () => {
    expect(Exception.prototype.constructor).toBe(Exception);
  });

  it("must be an instance of Error", () => {
    expect(Exception.prototype instanceof Error).toBe(true);
  });

  it("must have a context property", () => {
    expect(new Exception("foo", { a: 1 }).context).toEqual({ a: 1 });
  });

  it("must have a default context property", () => {
    expect(new Exception("foo").context).toEqual({});
  });

  it("must have a wrap method", () => {
    expect(typeof Exception.wrap).toBe("function");
  });

  it("wrap must return a promise", () => {
    expect(Exception.wrap(() => Promise.resolve(1))).toBeInstanceOf(Promise);
  });

  it("wrap must return a promise", () => {
    expect(Exception.wrap(() => Promise.resolve(1))).resolves.toBe(1);
  });

  it("wrap must return a promise", () => {
    expect(Exception.wrap(() => Promise.reject(new Error("foo")))).rejects.toBeInstanceOf(Exception);
  });

  it("wrap with exception merge", async () => {
    try {
      await Exception.wrap(
        () => {
          throw new Exception("foo", { a: 1 });
        },
        { b: 2 },
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Exception);
      expect(err.message).toBe("foo");
      expect(err.context).toEqual({ a: 1, b: 2 });
    }
  });
});
