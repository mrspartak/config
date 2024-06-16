import * as s from "superstruct";
import * as v from "valibot";
import { describe, expect, it } from "vitest";
import * as yup from "yup";
import * as z from "zod";
import { getParseFn, validate } from "../../../src/util/validation";

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

  it("should throw an error", () => {
    const parser = { test: "test" };
    // @ts-expect-error Testing error
    expect(() => validate("test", parser)).toThrowError("Could not find a validator fn");
  });
});

describe("getParseFn", () => {
  it("must be a function", () => {
    expect(typeof getParseFn).toBe("function");
  });

  it("should return a function from zod", () => {
    const parser = z.string();
    const result = getParseFn(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).resolves.toBe("test");
  });

  it("should return a function from valibot", () => {
    const parser = v.parser(v.string());
    const result = getParseFn(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should return a function from yup", () => {
    const parser = yup.string();
    const result = getParseFn(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should return a function from superstruct", () => {
    const parser = s.string();
    const result = getParseFn(parser);
    expect(typeof result).toBe("function");
    expect(result("test")).toBe("test");
  });

  it("should throw an error", () => {
    const parser = { test: "test" };
    // @ts-expect-error Testing error
    expect(() => getParseFn(parser)).toThrowError("Could not find a validator fn");
  });
});
