import { describe, expect, it } from "vitest";
import * as z from "zod";
import { fromObject } from "../../../src/factories/objectFactory";

describe("fromObject", () => {
  it("must be a function", () => {
    expect(typeof fromObject).toBe("function");
  });

  it("should return an object", () => {
    const result = fromObject({
      data: { test: "test" },
      schema: z.object({ test: z.string() }),
    });
    expect(result).resolves.toEqual({ test: "test" });
  });

  it("should throw an error, wrong validator", () => {
    // @ts-expect-error Testing error
    expect(() => fromObject({ data: { test: "test" }, schema: { test: "test" } })).rejects.toThrowError(
      "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
    );
  });

  it("should throw an error, wrong data", () => {
    expect(() => fromObject({ data: "test", schema: z.object({ test: z.string() }) })).rejects.toThrowError(
      "Expected object, received string",
    );
  });
});
