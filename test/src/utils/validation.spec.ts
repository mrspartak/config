import * as myzod from "myzod";
import * as s from "superstruct";
import * as v from "valibot";
import { describe, expect, it } from "vitest";
import * as yup from "yup";
import * as z from "zod";
import { getValidator, validate } from "../../../src/util/validation";

describe("validate", () => {
  it("must be a function", () => {
    expect(typeof validate).toBe("function");
  });

  it("should return a function from zod", () => {
    const parser = z.string();
    const result = validate("test", parser);
    expect(result).resolves.toBe("test");
  });

  it("should return a function from valibot", () => {
    const parser = v.parser(v.string());
    const result = validate("test", parser);
    expect(result).toBe("test");
  });

  it("should return a function from yup", () => {
    const parser = yup.string();
    const result = validate("test", parser);
    expect(result).toBe("test");
  });

  it("should return a function from superstruct", () => {
    const parser = s.string();
    const result = validate("test", parser);
    expect(result).toBe("test");
  });

  it("should return a function from myzod", () => {
    const parser = myzod.string();
    const result = validate("test", parser);
    expect(result).toBe("test");
  });

  it("should throw an error", () => {
    const parser = { test: "test" };
    // @ts-expect-error Testing error
    expect(() => validate("test", parser)).toThrowError(
      "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
    );
  });
});

describe("getValidator", () => {
  it("must be a function", () => {
    expect(typeof getValidator).toBe("function");
  });

  it("should return a function from zod", () => {
    const parser = z.string();
    const result = getValidator(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).resolves.toBe("test");
  });

  it("should return a function from valibot", () => {
    const parser = v.parser(v.string());
    const result = getValidator(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should return a function from yup", () => {
    const parser = yup.string();
    const result = getValidator(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should return a function from superstruct", () => {
    const parser = s.string();
    const result = getValidator(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should return a function from myzod", () => {
    const parser = myzod.string();
    const result = getValidator(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should throw an error", () => {
    const parser = { test: "test" };
    // @ts-expect-error Testing error
    expect(() => getValidator(parser)).toThrowError(
      "Could not find a validator function in the given schema. We suppurt validators like zod, yup, superstruct, etc.",
    );
  });
});
