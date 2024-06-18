import { describe, expect, it } from "vitest";
import * as z from "zod";
import { fromURL } from "../../../src/factories/urlFactory";

const DEFAULT_CONFIG_URL =
  "https://gist.githubusercontent.com/mrspartak/5a4bd33c7a3d87caf07b2dcf42dbdc87/raw/a9ddec06db8b4dd890e331a87fc8630e13fec9ff/default.json";
const RUNTIME_CONFIG_URL =
  "https://gist.githubusercontent.com/mrspartak/5a4bd33c7a3d87caf07b2dcf42dbdc87/raw/a9ddec06db8b4dd890e331a87fc8630e13fec9ff/runtime.json";

describe("fromURL", () => {
  it("must be a function", () => {
    expect(typeof fromURL).toBe("function");
  });

  it("should return an object", () => {
    const result = fromURL({
      url: DEFAULT_CONFIG_URL,
      schema: z.object({ a: z.number() }),
    });
    expect(result).resolves.toEqual({ a: 123 });
  });

  it("should merge objects", () => {
    const result = fromURL({
      url: [DEFAULT_CONFIG_URL, RUNTIME_CONFIG_URL],
      schema: z.object({ a: z.number(), b: z.string() }),
    });
    expect(result).resolves.toEqual({ a: 2, b: "assd" });
  });

  it("should throw an error, wrong validator", () => {
    // @ts-expect-error Testing error
    expect(() => fromURL({ url: DEFAULT_CONFIG_URL, schema: { test: "test" } })).rejects.toThrowError(
      "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
    );
  });

  it("should throw an error, wrong data", () => {
    expect(() => fromURL({ url: DEFAULT_CONFIG_URL, schema: z.object({ test: z.string() }) })).rejects.toThrowError();
  });

  it("should throw an error, wrong url", () => {
    expect(() => fromURL({ url: "test", schema: z.object({ test: z.string() }) })).rejects.toThrowError();
  });
});
